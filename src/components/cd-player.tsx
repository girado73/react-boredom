import { SkipNext, SkipPrevious, Pause, PlayArrow } from "@mui/icons-material"
import { Card, Box, CardContent, Typography, IconButton, CardMedia } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React from "react"


export const CDPlayer = ({ imgSrc, title, interpret }: { imgSrc: String, title: String, interpret: String }) => {

  const [playing, setPlaying] = React.useState(Boolean)
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: 'flex',
        padding: 2,
        alignItems: 'center',
        maxWidth: 500,
        borderRadius: 5,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto', flexGrow: 1 }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ mb: 1, color: 'text.secondary' }}
          >
            {interpret}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
          </IconButton>
          <IconButton
            onClick={() => setPlaying(!playing)}
            aria-label="play/pause"
          >
            {playing
              ? <Pause sx={{ height: 38, width: 38 }} />
              : <PlayArrow sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: 151, // fixed typo (was "weight")
          height: playing ? 151 : 75, // half CD when not playing
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          transition: 'height 0.6s ease-in-out', // smooth expansion
        }}
      >
        <CardMedia
          component="img"
          image={imgSrc.toString()}
          alt="CD"
          sx={{
            width: 151,
            height: 151,
            borderRadius: '50%',
            transition: 'margin-top 0.6s ease-in-out',
            marginTop: playing ? 0 : -12, // slide CD up/down
            ...(playing && {
              animation: "spin 5s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }),
          }}
        />
      </Box>
    </Card>
  );

}
