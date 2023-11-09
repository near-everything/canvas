// I want this to show the login, or switch between the edit and view

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  border: 2px solid black;
  padding: 10px;
  margin-top: 20px;
  width: 95%;
  height: 95%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

return (
  <Container>
    <Content>
      <Widget src="/*__@appAccount__*//widget/canvas.view" />
    </Content>
  </Container>
);
