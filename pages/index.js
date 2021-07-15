import styled from "styled-components";
import MainGrid from "../src/components/MainGrid";
const Box = styled.div`
  border-radius: 8px;
  background-color: #ffff;
`;

export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: "profileArea" }}>
        <Box>
          <img src='https://github.com/lucasarlim.png' 
          />
        </Box>
      </div>
      <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
        <Box></Box>
      </div>
      <div className style={{ gridArea: "profileRelationsArea" }}>
        <Box>

        </Box>
      </div>
    </MainGrid>
  );
}
