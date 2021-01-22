import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import axios from 'axios'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, CalendarScheduler, Income, DateView } from '../../types'
import useIncome from '../../hooks/useIncome'
import IncomeTable from '../../components/IncomeTable'
import TotalIncome from '../../components/TotalIncome'
import ProfileDashboard from '../../components/ProfileDashboard'
import { months, date, year, currentMonth } from '../../utils/dateValues'

import 'react-calendar/dist/Calendar.css'
import './style.css'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 3rem',
    width: '100vw',
    paddingLeft: '6rem',
    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '70vw',
  },
  grid: {
    width: '90vw',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  chartHeightPaper: {
    height: 640,
  },
}))

export default function IncomePage(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const [showMonth, setShowMonth] = useState('')
  const [isMonthClicking, setIsMonthClicking] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendar, setCalendar] = useState({} as any)
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [err, incomeData, defaultDateView, calendarData] = useIncome()
  const [month, setMonth] = useState('')
  const [monthIncome, setMonthIncome] = useState([] as Income[])

  const [loaded, setIsLoaded] = useState(false)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setCalendar(calendarData)
      //atm the below set state keeps running an infinite loop
      setDateView(defaultDateView as DateView)
      console.log(dateView)

    }
  }, [isAuthenticated, calendarData, dateView])
  // console.log('date view test', defaultDateView)
  const setMonthView = (
    currentYear: number,
    currentMonth: string,
    foundYear: CalendarScheduler | undefined,
    currentIndex: number
  ) => {
    setTimeout(() => {
      const foundMonth = foundYear?.months.find(
        (month: any) => month.name === months[currentIndex]
      )
      setMonthIncome(foundMonth?.income)
      setTimeout(() => {
        // loadChartData(foundMonth?.income);
      }, 100)
      setIsLoaded(true)
    }, 150)
  }

  const updateMonthlyIncome = (updatedIncome: Income[]) => {
    console.log('update income', updatedIncome)
    setMonthIncome(updatedIncome)
  }

  useEffect(() => {
    setMonthIncome(incomeData as Income[])
  }, [])
 
  const onChange = () => {
    setCalendarDate(calendarDate)
  }

  const showYearOnClick = (e: any) => {
    const year = e.getFullYear()
    setDateView({ ...dateView, year: year })
    const yearIncome = calendar.years.find(
      (calendar: any) => calendar.year === year
    )
  }

  const showMonthOnClick = (e: any) => {
    setIsMonthClicking(true)
    const year = e.getFullYear()
    const yearIncome = calendar.years.find((i: any) => i.year === year)
    const currentIndex = e.getMonth()
    setDateView({ ...dateView, year: year, month: months[currentIndex] })
    setMonthView(dateView.year, dateView.month, yearIncome, currentIndex)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={10} md={6} lg={4}>
              {/* Chart goes here */}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <TotalIncome
                  year={dateView.year}
                  month={dateView.month}
                  monthlyIncome={incomeData}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <ProfileDashboard />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                {/* {loaded && ( */}
                  <IncomeTable
                    // key={calendar?._id}
                    monthlyIncome={!isMonthClicking ? incomeData : monthIncome}
                    year={dateView.year}
                    month={dateView.month}
                    updateMonthlyIncome={updateMonthlyIncome}
                  />
                {/* )} */}
              </Paper>
            </Grid>
            <Grid item xs={10} md={6}>
              <Calendar
                onChange={onChange}
                value={calendarDate}
                showNeighboringMonth={true}
                onClickYear={showYearOnClick}
                onClickMonth={showMonthOnClick}
                defaultView="year"
                maxDetail="year"
                // tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
