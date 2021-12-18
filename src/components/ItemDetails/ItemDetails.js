import { Box, Paper } from "@mui/material";
export default function ItemDetails()
{
    return(<>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
    <Paper elevation={3}>
    <div className="item-image">
        hello
    </div>
    </Paper>
    </Box>
    </>);
}