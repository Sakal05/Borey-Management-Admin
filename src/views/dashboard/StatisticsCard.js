// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useState, useEffect, useContext } from 'react'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import axios from 'axios'

const StatisticsCard = props => {
  const [data, setData] = useState({
    totalCompanies: '',
    totalUser: '',
    totalForm: ''
  })
  
  const { token } = props

  const fetchCompanies = async () => {
    try {
      const res = await axios({
        method: 'GET',
        // baseURL: API_URL,
        url: 'http://127.0.0.1:8000/api/company/showCompanies',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Companies: ',res)
      setData(prevState => ({
        ...prevState,
        totalCompanies: res.data.length
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTotalUsers = async () => {
    try {
      const res = await axios({
        method: 'GET',
        // baseURL: API_URL,
        url: 'http://127.0.0.1:8000/api/user_infos',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Users: ',res)
      setData(prevState => ({
        ...prevState,
        totalUser: res.data.length
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTotalForm = async () => {
    let totalForm = 0;
    try {
      const res = await axios({
        method: 'GET',
        // baseURL: API_URL,
        url: 'http://127.0.0.1:8000/api/form_generals',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Form generals', res);
      totalForm = totalForm + res.data.length;
    } catch (err) {
      console.log(err)
    }

    try {
      const res = await axios({
        method: 'GET',
        // baseURL: API_URL,
        url: 'http://127.0.0.1:8000/api/form_environments',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Form generals', res)
      totalForm = totalForm + res.data.length;
      console.log("total form: ", totalForm)
    } catch (err) {
      console.log(err)
    }

    setData(prevState => ({
      ...prevState,
      totalForm: totalForm
    }))
  }

  useEffect(() => {
    fetchCompanies()
    fetchTotalUsers()
    fetchTotalForm()
  }, [token])

  return (
    <Card>
      <CardHeader
        title='Statistical Data'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                <TrendingUp sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Total Company</Typography>
                <Typography variant='h6'>{data.totalCompanies ? data.totalCompanies : '0'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.main`
                }}
              >
                <AccountOutline sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Total User</Typography>
                <Typography variant='h6'>{data.totalUser !== '' ? data.totalUser : '0'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `warning.main`
                }}
              >
                <TrendingUp sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Total Form</Typography>
                <Typography variant='h6'>{data.totalForm ? data.totalForm : '0'}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
