import React from "react";
import styled from "styled-components";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/libs/AlurakutCommons";

function ProfileSidebar(prop) {
  return (
    <Box>
      <img
        src={`https://github.com/${prop.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />

      <hr />
      <p>
        <a className="boxLink" href={`http:/:github.com/${prop.githubUser}`}>
          @{prop.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]); 

  const githubUser = "lucasarlim";
  const favoritesPerson = [
    "albertosilv",
    "viniciuslins256",
    "murilo-gruppi",
    "davigsousa",
    "magao02",
    "liradriano",
  ];

  return (
    <>
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
             <form onSubmit={function handleCriaComunidade(e) {
                 e.preventDefault();
                 const dadosDoForm = new FormData(e.target);

                 console.log('Campo: ', dadosDoForm.get('title'));
                 console.log('Campo: ', dadosDoForm.get('image'));

                 const comunidade = {
                   id: new Date().toISOString(),
                   title: dadosDoForm.get('title'),
                   image: dadosDoForm.get('image'),
                 }
                 const comunidadesAtualizadas = [...comunidades, comunidade];
                 setComunidades(comunidadesAtualizadas)
             }}>
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

               <button>
                 Criar comunidade
               </button>
             </form>
           </Box>
         </div>
         <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
           <ProfileRelationsBoxWrapper>
             <h2 className="smallTitle">
               Comunidades ({comunidades.length})
             </h2>
             <ul>
               {comunidades.map((itemAtual) => {
                 return (
                   <li key={itemAtual.id}>
                     <a href={`/users/${itemAtual.title}`}>
                       <img src={itemAtual.image} />
                       <span>{itemAtual.title}</span>
                     </a>
                   </li>
                 )
               })}
             </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritesPerson.length})
            </h2>

            <ul>
              {favoritesPerson.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
