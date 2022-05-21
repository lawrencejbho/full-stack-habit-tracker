<Grid container spacing={1}>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>A</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>B</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>C</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>D</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>1</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>2</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>3</div>
</Grid>
<Grid item xs={6}>
  <div style={{ background: randomColor() }}>4</div>
</Grid>
</Grid>

<Grid
container
spacing={{ xs: 2, md: 3 }}
columns={{ xs: 4, sm: 8, md: 12 }}
>
{Array.from(Array(6)).map((_, index) => (
  <Grid item xs={2} sm={4} md={4} key={index}>
    <Button style={{ background: randomColor() }}>Test</Button>
  </Grid>
))}
</Grid>