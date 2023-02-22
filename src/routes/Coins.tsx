import styled from "styled-components";
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div``;
const Header = styled.header``;
const CoinsList = styled.ul``;
const Coin = styled.li``;
function Coins() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        <Coin />
      </CoinsList>
    </Container>
  );
}
export default Coins;
