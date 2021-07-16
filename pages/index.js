import styled from "styled-components";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/libs/AlurakutCommons";

function ProfileSidebar(prop) {
  return (
    <Box>
      <img
        src={`https://github.com/${prop.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
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
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
           <ProfileSidebar githubUser={githubUser} />
         </div>
         <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
           <Box>
             <h1 className="title">
               Bem vindo(a) 
             </h1>

             <OrkutNostalgicIconSet />
           </Box>
         </div>
         <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
           <ProfileRelationsBoxWrapper>
             <h2 className="smallTitle">
               Pessoas da comunidade ({favoritesPerson.length})
             </h2>

             <ul>
               {favoritesPerson.map((itemAtual) => {
                 return (
                   <li>
                     <a href={`/users/${itemAtual}`} key={itemAtual}>
                       <img src={`https://github.com/${itemAtual}.png`} />
                       <span>{itemAtual}</span>
                     </a>
                   </li>
                 )
               })}
             </ul>
           </ProfileRelationsBoxWrapper>
         </div>
      </MainGrid>
    </>
  );
}
