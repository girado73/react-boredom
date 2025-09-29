import { Stack } from '@mui/material';
import './App.css'
import { CDPlayer } from './components/cd-player';

function App() {
  return (
    <>
      <Stack direction={"row"} spacing={2} justifyContent={"center"} alignItems={"center"} sx={{ mt: 5, flexWrap: 'wrap', gap: 5 }}>
        <CDPlayer
          imgSrc={"https://mui.com/static/images/cards/live-from-space.jpg"}
          title={"Live From Space"}
          interpret={"Paul McCartney"}
        />
        <CDPlayer
          imgSrc={"https://cataas.com/cat"}
          title={"Cats Love Music"}
          interpret={"Caatus"}
        />
      </Stack>
    </>
  );
}

export default App

