import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Calendar from 'react-calendar'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {
  AppState,
  CalendarScheduler,
  DateView,
  DailyExpense,
  Expense,
  ViewMonth,
} from '../../types'

import useExpenses from '../../hooks/useExpenses'
import useExpensesChart from '../../hooks/useExpensesChart'
import useTotalExpenses from '../../hooks/useTotalExpenses'
import { months, date, year, currentMonth } from '../../utils/dateValues'
import EmptyChartContainer from '../../components/EmptyChartContainer'
import ExpensesChart from '../../components/ExpensesChart'
import TotalExpenses from '../../components/TotalExpenses'
import MonthlyBudget from '../../components/MonthlyBudget'
import ExpensesTable from '../../components/ExpensesTable'
import TileContent from '../../components/TileContent'
import AddExpense from '../../components/AddExpense'

import 'react-calendar/dist/Calendar.css'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 1rem',
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
    height: 340,
  },
  chartHeightPaper: {
    height: 550,
  },
  addExpenseContainer: {
    backgroundColor: 'rgba(25, 20, 20, 0.6)',
    position: 'absolute',
    height: '200vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: '0',
    left: '17px',
    zIndex: 2 
  },
  addExpenseFormContainer: {
    position: 'fixed',
    top: '27%'
  },
}))

export default function ExpensesPage(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const total = useSelector((state: AppState) => state.expenses.total)
  const [monthlyChart, setMonthlyChart] = useState([] as DailyExpense[])
  const [monthlyTotalExpenses, setMonthlyTotalExpenses] = useState(
    ([] as unknown) as ViewMonth
  )
  const [expensesChartData] = useExpensesChart(monthlyChart)
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useExpenses()
  const [calendarDate, setCalendarDate] = useState(date)
  const [isFormShowing, setIsFormShowing] = useState(false)
  //moving this to hook
  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)
  const [isDayClicking, setIsDayClicking] = useState(false)
  //moving this to hook
  const [viewMonth, setViewMonth] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)
  const switchDateView = {} as DateView
  const switchMonth = {} as ViewMonth

  const [totalExpenses] = useTotalExpenses(monthlyTotalExpenses)
  //moving this to hook
  const [schedule, setSchedule] = useState({
    day: '',
    expenses: [],
  })
  // console.log('total', total)
  // console.log('view month', viewMonth)
  //moving this to hook
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  } as Expense)

  const { category, description, amount } = expense
  const [loadTiles, setLoadTiles] = useState(false)

  const loadChart = () => {
    setMonthlyChart(defaultMonth?.days)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setDateView(defaultDateView as DateView)
      setViewMonth(defaultMonth)
      setExpense({
        category: '',
        description: '',
        amount: 0,
        date: moment(date).format('LL'),
        year: year,
        month: currentMonth,
      })
      loadChart()
      setMonthlyTotalExpenses(defaultMonth)
      console.log(calendarData.years)
    }
  }, [dateView, viewMonth, calendarData, defaultMonth])

  const showFormOnClick = () => {
    setIsFormShowing(true)
  }

  const hideFormOnClick = () => {
    setIsFormShowing(false)
  }

  const closeForm = () => {
    setIsFormShowing(false)
  }

  const updateDailyExpenses = () => {
    // console.log('update expenses', expenses)
    setIsDayClicking(false)
    // console.log('update expenses', expensesData)
    setDailyExpense(expenses)
    // console.log(dailyExpense)
  }

  const showDayOnClick = async (e: any) => {
    console.log(calendarData.years)
    setIsFormShowing(false)
    setIsDayClicking(true)
    setSchedule({ ...schedule, day: e })
    try {
      const selectedYear = await e.getFullYear()
      const currentIndex = await e.getMonth()
      const clickedMonth = months[currentIndex]
      //this will set the day, year and month to the expense in case we will add a new new one for the day
      //we should not modify the state directly but now it's to make it work
      dateView.year = selectedYear
      dateView.month = months[currentIndex]
      //this is the corret way
      // setDateView({year: selectedYear, month: months[currentIndex]})
      // console.log('date view', dateView)
      setExpense({
        category: '',
        description: '',
        amount: 0,
        date: moment(e).format('LL'),
        year: selectedYear,
        month: clickedMonth,
      })
      // console.log('expense from selectDay', expense)
      // console.log('after setting date view', calendarData.years)
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === selectedYear
      )

      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === clickedMonth
      )
      setMonthlyChart(foundMonth.days)
      console.log('monthly chart should update', monthlyChart)

      //we should not modify the state directly but now it's to make it work
      switchMonth.name = foundMonth.name
      switchMonth.income = foundMonth.income
      switchMonth.days = foundMonth.days
      setMonthlyTotalExpenses(switchMonth)

      //this is the proper way
      // setViewMonth(foundMonth);
      // console.log('view month from select day', viewMonth)
      const selectedDay = await foundMonth.days.find(
        (d: any) => moment(d.day).format('LL') === moment(e).format('LL')
      )
      if (selectedDay !== undefined) {
        setDailyExpense(selectedDay)
      } else {
        setDailyExpense(schedule)
      }
    } catch (err) {
      console.log(err)
    }
  }
 
 //this function is not working properly, fixing it
  const switchMonthOnClick = async (e: any) => {
    console.log(calendarData.years)
    console.log(e)
    console.log(e.value.getFullYear())
    try {
    const selectedYear = await e.value.getFullYear()
    const currentIndex = await e.value.getMonth()
    console.log('one', selectedYear, months[currentIndex])

    const selectedYearTwo = await e.activeStartDate.getFullYear()
    const currentIndexTwo = await e.activeStartDate.getMonth()
    console.log('two', selectedYearTwo, months[currentIndexTwo], months)
    const clickedMonth = months[currentIndex]
    // console.log(e.activeStartDate, selectedYear, clickedMonth)
    dateView.year = selectedYearTwo
    dateView.month = months[currentIndexTwo]
    console.log(dateView)
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === dateView.year
      )
      console.log(foundYear)
      for(const month of foundYear.months) {
          // console.log(month)
          
          if(month.name === dateView.month) {
            console.log('month here', month)
            setMonthlyChart(month.days)
            console.log('monthly chart should update', monthlyChart)
            //we should not modify the state directly but now it's to make it work
            // console.log(foundMonth)
            // console.log(viewMonth)
            // setViewMonth({name: month.name, income: month.income, days: month.days})
            console.log(viewMonth)
            /*viewMonth.name = month.name
            // console.log(viewMonth)
            viewMonth.income = month.income
            viewMonth.days = month.days*/
              } else {

          }
      }
      /*
      console.log(calendarData.years)
      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === dateView.month
      )
      setMonthlyChart(foundMonth.days)
      console.log('monthly chart should update', monthlyChart)
      //we should not modify the state directly but now it's to make it work
      // console.log(foundMonth)
      // console.log(viewMonth)
      viewMonth.name = foundMonth.name
      // console.log(viewMonth)
      viewMonth.income = foundMonth.income
      viewMonth.days = foundMonth.days*/
      // console.log(calendarData.years)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log('total expenses', totalExpenses)
  // console.log('chart data here', expensesChartData)
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={5} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {expensesChartData.length > 0 ? (
                  <ExpensesChart
                    chartData={expensesChartData}
                    year={dateView.year}
                    month={dateView.month}
                    valueField="amount"
                    argumentField="category"
                    name="category"
                  />
                ) : (
                  <EmptyChartContainer
                    month={dateView.month}
                    year={dateView.year}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalExpenses
                  year={dateView.year}
                  month={dateView.month}
                  totalAmount={totalExpenses}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* Total balance goes here */}
                <MonthlyBudget
                  year={dateView.year}
                  month={dateView.month}
                  //total month income will be added here
                  totalExpenses={total}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <ExpensesTable
                  day={isDayClicking ? schedule.day : date}
                  dailyExpense={
                    isDayClicking
                      ? dailyExpense
                      : (expensesData as DailyExpense)
                  }
                  updateDailyExpenses={updateDailyExpenses}
                  updateEditedExpenses={updateDailyExpenses}
                  showFormOnClick={showFormOnClick}
                />
              </Paper>
            </Grid>
            {isFormShowing && (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className={classes.addExpenseContainer}
              >
                <Paper className={classes.addExpenseFormContainer}>
                  <AddExpense
                    expense={expense}
                    day={isDayClicking ? schedule.day : date}
                    category={category}
                    description={description}
                    amount={amount}
                    setExpense={setExpense}
                    hideFormOnClick={hideFormOnClick}
                    closeForm={closeForm}
                    updateDailyExpenses={updateDailyExpenses}
                  />
                </Paper>
              </Grid>
            )}

            <Grid item xs={10} md={6}>
              <Calendar
                value={calendarDate}
                // onClickMonth={switchMonthOnClick}
                onChange={showDayOnClick}
                onActiveStartDateChange={switchMonthOnClick}
                showNeighboringMonth={true}
                tileContent={({ date, view }: any) => (
                  <TileContent date={date} view={view} viewMonth={viewMonth} />
                )}
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
