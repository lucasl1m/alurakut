import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import styled from "styled-components";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/libs/AlurakutCommons";
import IndexPage from "../src/components/IndexPage";

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.total})
      </h2>

      <ul>
        {props.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a
                href={itemAtual.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title="Site do usuário"
              >
                <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <p>
        <a className="boxLink" href={`/amigos`}>
          Ver todos
        </a>
      </p>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const [comunidades, setComunidades] = React.useState([]);

  const githubUser = props.githubUser;
  const [followers, setFollowers] = React.useState([]);
  const [numerosSegui, setNumerosSegui] = React.useState([]);
  const [following, setFollowing] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.github.com/users/lucasarlim/followers")
      .then(function (responseServer) {
        return responseServer.json();
      })
      .then(function (responseCompleteServer) {
        setFollowers(responseCompleteServer);
      });

    const urlNumeros = `https://api.github.com/users/${githubUser}`;
    fetch(urlNumeros)
      .then((resposta) => resposta.json())
      .then((respostaJson) => setNumerosSegui(respostaJson));

    const urlFollowing = `https://api.github.com/users/${githubUser}/following`;
    fetch(urlFollowing)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setFollowing(respostaCompleta);
      });

    // API GraphQL
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
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato);
        setComunidades(comunidadesVindasDoDato);
      });
  }, []);

  console.log("seguidores antes do return", followers);

  return (
    <>
      <IndexPage />
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log("Campo: ", dadosDoForm.get("title"));
                console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                };

                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <hr />
            <p>
              <a className="boxLink" href={`/comunidades`}>
                Ver todos
              </a>
            </p>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
            total={numerosSegui.followers}
          />

          <ProfileRelationsBox
            title="Seguindo"
            items={following}
            total={numerosSegui.following}
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubUser,
    },
  };
}
