import React  from 'react'
  import { Typography } from '@material-ui/core'
const NotFound = () => {
    return ( 
        <div>
          <Typography variant='h3'color ='textSecondary'>Error 404(Not found)</Typography>
          <Typography variant='h5' color ='error'>Sorry,the page you are looking for does not exist</Typography>
          <Typography variant='h6' color ='secondary'>It might be that you typed something incorrectly</Typography>
     

    </div>
     );
}
 
export default NotFound;