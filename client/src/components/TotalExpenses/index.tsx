import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalExpensesProps } from '../../types'
import Title from "../Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalExpenses({ 
    month, 
    year, 
    monthExpenses 
}: TotalExpensesProps) {
  // console.log('from total exoenses', month, year, monthExpenses)
  const classes = useStyles()
  const date = new Date()
  const calculateTotalExpenses = () => {
    let count = 0
    if(monthExpenses !== undefined) {
        for(const dayIndex in monthExpenses.days) {
            const { expenses } = monthExpenses.days[dayIndex]
            for(const expense of expenses) {
                count += expense.amount
            }    
        }
        return count
    }
  }

  useEffect(() => {   
      calculateTotalExpenses()
  })
  const totalExpenses = calculateTotalExpenses()

  return (
    <React.Fragment>
      <Title>
        Total {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        €{totalExpenses} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date.toString()}
      </Typography>
    </React.Fragment>
  );
}
