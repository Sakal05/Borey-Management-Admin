import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
 const [currentUser, setCurrentUser] = useState(null)
 const [loadingData, setLoadingData] = useState(true)
 const [data, setData] = useState({
  totalCompanies: '',
  totalUser: '',
  totalForm: ''
})
  const router = useRouter();
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
      if (err.response.data.message === "Unauthenticated.") {
        router.push('/pages/a/login')
      }
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

 useEffect(() => {
    const fetchUser = async () => {
      if (token !== null) {
        try {
          const res = await axios({
            method: 'GET',
            // baseURL: API_URL,
            url: 'http://127.0.0.1:8000/api/admin/loggedadmin',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log('Admin Info: ', res)
          setCurrentUser(res.data.admin)
          setLoadingData(false)
        } catch (err) {
          console.log(err)
        }
      } else {
        
      }
    }
    
    fetchUser();
    
  }, [token]);

    return (
      <ApexChartWrapper>
        {loadingData && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
          <Typography variant='body1' style={{ marginLeft: '1rem' }}>
            Please wait, loading...
          </Typography>
        </div>
      )}
      { currentUser !== null && (

        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy info={currentUser} token={token}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <StatisticsCard info={currentUser} token={token}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <WeeklyOverview info={currentUser}  token={token}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TotalEarning info={currentUser} token={token}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats={data.totalCompanies}
                  icon={<Poll />}
                  color='success'
                  trendNumber='+42%'
                  title='Total Companies'
                  subtitle='Weekly Profit'
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats={data.totalUser}
                  title='Total Users'
                  trend='negative'
                  color='secondary'
                  trendNumber='-15%'
                  subtitle='Past Month'
                  icon={<CurrencyUsd />}
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats={data.totalForm}
                  trend='negative'
                  trendNumber='-18%'
                  title='Total Form Report'
                  subtitle='Yearly Project'
                  icon={<BriefcaseVariantOutline />}
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVerticalComponent
                  stats='15'
                  color='warning'
                  trend='negative'
                  trendNumber='-18%'
                  subtitle='Last Week'
                  title='Sales Queries'
                  icon={<HelpCircleOutline />}
                />
              </Grid>
            </Grid>
          </Grid>
         
        
        </Grid>
      )}
      </ApexChartWrapper>
    )
  }
  
  export default Dashboard