import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import IndexPage from "../src/components/IndexPage";
import Box from "../src/components/Box";

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/libs/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import CommunityGrid from "../src/components/CommunityGrid";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
        <img
          src={`https://github.com/${props.githubUser}.png`}
          alt="Foto do usuário"
          style={{ borderRadius: "8px" }}
        />
        <hr />
        <p>
          <a
            className="boxLink"
            href={`https://github.com/${props.githubUser}`}
            title="Nome do usuário"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{props.githubUser}
          </a>
        </p>
        <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function menuComunidades(props) {
  // USUÁRIO GITHUB
  const githubUser = props.githubUser;
  // COMUNIDADES
  const [comunidades, setComunidades] = React.useState([]);

  React.useEffect(function () {
    // API DATOCMS GraphQL Comunidades
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "33a9d444d909dcd4fe7f5471c0a1fb",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
            allCommunities {
            title
            imageUrl
            }
        }`,
      }),
    })
      .then((resposta) => resposta.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        // console.log(comunidadesVindasDoDato);
        setComunidades(comunidadesVindasDoDato);
      });
  }, []);

  return (
    <>
      <IndexPage />
      <AlurakutMenu githubUser={githubUser} />
      <CommunityGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div style={{ gridArea: "comunidadeArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <img src={itemAtual.imageUrl} alt="Capa da comunidade" />
                    <span style={{ fontSize: "16px" }}>{itemAtual.title}</span>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </CommunityGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
