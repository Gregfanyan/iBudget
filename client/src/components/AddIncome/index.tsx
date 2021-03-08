import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CancelButton from '../CancelButton'

import { AppState } from '../../types'
import { AddIncomeProps } from '../../types/income'
import { addIncome } from '../../redux/actions/income'
import SaveButton from '../SaveButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid rgba(184, 173, 173, 0.6)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 22, 1, 2),
      borderRadius: '5px',
    },
    save: {
      border: 'none',
      background: 'none',
      display: 'inline-block',
    },
    select: {
      width: '20.5rem',
    },
    input: {
      width: '22rem',
    },
    btn: {
      display: 'inline-block',
    },
  })
)

export default function AddIncome({
  year,
  month,
  handleClose,
  hideFormOnClick,
}: AddIncomeProps) {
  const dispatch = useDispatch()
  const updatedIncome = useSelector((state: AppState) => state.income.income)

  const classes = useStyles()
  const [income, setIncome] = useState({
    category: '',
    description: '',
    amount: '',
    year: year,
    month: month,
  })
  console.log('from add income', income)
  const { category, description, amount } = income
  /*
  useEffect(() => {
    updateMonthlyIncome(updatedIncome)
    console.log(updatedIncome)
  }, [])
  console.log(updatedIncome)
*/
  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(addIncome(income))

    handleClose()
    /*
    setTimeout(() => {
      console.log('income should update here', updatedIncome)
      updateMonthlyIncome(updatedIncome)
    }, 3000)*/
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setIncome({
      ...income,
      [name]: value,
    })
  }
  return (
    <div>
      <div className={classes.paper}>
        <div className="form-container">
          <h4>Add Income</h4>
          <form className={classes.root} onSubmit={handleSubmit}>
            <div className="input-topics">
              <InputLabel id="demo-simple-select-outlined-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                name="category"
                //   size="small"
                onChange={handleChange}
                className={classes.select}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="investments">Investments</MenuItem>
                <MenuItem value="real estate">Real Estate</MenuItem>
                <MenuItem value="unemployment benefits">
                  Unemployment Benefits
                </MenuItem>
                <MenuItem value="tax return">Tax Return</MenuItem>
                <MenuItem value="child allowance">Child Allowance</MenuItem>
              </Select>
              <div className="input-topics">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={description}
                  name="description"
                  label="description"
                  onChange={handleChange}
                  className={classes.input}
                />
              </div>
              <div className="input-topics">
                <TextField
                  value={amount}
                  name="amount"
                  variant="outlined"
                  id="outlined-basic"
                  type="number"
                  label="amount"
                  onChange={handleChange}
                  className={classes.input}
                />
              </div>
              <button className={classes.save}>
                <SaveButton />
              </button>
              <button className={classes.save} onClick={hideFormOnClick}>
                <CancelButton />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
