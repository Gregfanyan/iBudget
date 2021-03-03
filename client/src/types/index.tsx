// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

//user action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const SHOW_ERRORS = 'SHOW_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const SHOW_VALIDATIONS = 'SHOW_VALIDATIONS'
export const CLEAR_VALIDATIONS = 'CLEAR_VALIDATIONS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER = 'UPDATE_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const CLEAR_EMAIL_CONFIRMATION = 'CLEAR_EMAIL_CONFIRMATION'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CLEAR_RESET_CONFIRMATION = 'CLEAR_RESET_CONFIRMATION'

//income action types
export const GET_INCOME = 'GET_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const UPDATE_INCOME = 'UPDATE_INCOME'
export const DELETE_INCOME = 'DELETE_INCOME'

//expenses action types
export const GET_EXPENSES = 'GET_EXPENSES'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const CALCULATE_TOTALEXPENSES = 'CALCULATE_TOTALEXPENSES'

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  name: string
  price: number
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type EditUser = {
  firstName: string
  lastName: string
  email: string
  newPassword: string
  repeatNewPassword: string
}

export type Income = {
  category: string
  description: string
  amount: number
  year: number
  month: string
  date: any
}

export type Expense = {
  category: string
  description: string
  amount: number
  //change this later
  date: any
  // date: string | Date
  year: number
  month: string
}

export type NavbarSecondaryListItemsProps = {
  user: User
}

export type AddIncomeProps = {
  year: number
  month: string
  handleClose: Function
  hideFormOnClick: any

}

export type AddIncomeBtnProps = {
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type SwitchChartBtnProps = {
  switchChartView: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  btnText: string
}

export type CalendarScheduler = {
  years: any
  year: number
  months: any
  month: object
  name: string
  income: Income[]
  expenses: Expense[]
  days: string[]
  day: object
}

export type IncomeTableProps = {
  year: number
  month: string
  monthlyIncome: any
  updateMonthlyIncome: Function
}

export type TotalIncomeProps = {
  month: string
  year: number
  monthlyIncome: any
}

export type DateView = {
  month: string
  year: number
}

export type DailyExpense = {
  day: string
  expenses: Expense[]
}

export type TileContentProps = {
  date: string
  view: string
  contentData: any
  activeStartDate: any
}

export type ViewMonth = {
  name: string
  days: Array<DailyExpense>
  income: Array<Income>
}

export type EmptyChartContainerProps = {
  month: string
  year: number
}

export type ExpensesTableProps = {
  day: string | Date
  dailyExpense: DailyExpense
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateDailyExpenses: Function
}

export type TotalExpensesProps = {
  month: string
  year: number
  totalAmount: number
}

export type MonthlyBudgetProps = {
  month: string
  year: number
  totalExpenses: number
}

export type TotalExpensesYearProps = {
  year: number
  totalAmount: number
}

export type ExpensesChartData = {
  category: string
  amount: number
}

export type YearChartData = {
  month: string
  income: number
  expenses: number
}

export type ExpensesChartProps = {
  chartData: ExpensesChartData[]
  year: number
  month: string
  valueField: string
  argumentField: string
  name: string
  className?: string
}

export type IncomeExpensesMonthChartProps = {
  data: any
  year: number
  month: string 
}

export type IncomeExpensesYearChartProps = {
  // data: YearChartData[] 
  data: any
  year: number
} 

export type AddExpenseBtnProps = {
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type AddExpenseProps = {
  expense: object
  setExpense: any
  day: string | Date
  category: string
  description: string
  amount: number
  hideFormOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  closeForm: Function
  updateDailyExpenses: Function
}

export type EditExpenseProps = {
  expenseId: string
  day: string | Date
  hideFormOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  dailyExpense: DailyExpense
}

export type RegisterFailAction = {
  type: typeof REGISTER_FAIL
}

export type RegisterUserSuccessAction = {
  type: typeof REGISTER_SUCCESS
  payload: {
    user: User
  }
}

export type LoginUserSuccessAction = {
  type: typeof LOGIN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type UpdateUserAction = {
  type: typeof UPDATE_USER
  payload: {
    user: User
  }
}

export type ForgotPasswordAction = {
  type: typeof FORGOT_PASSWORD
  payload: {
    emailMsg: string
  }
}

export type ClearEmailConfirmationAction = {
  type: typeof CLEAR_EMAIL_CONFIRMATION
}

export type ClearResetPasswordConfirmationAction = {
  type: typeof CLEAR_RESET_CONFIRMATION
}

export type ResetPasswordAction = {
  type: typeof RESET_PASSWORD
  payload: {
    resetMsg: string
  }
}

export type ShowErrorAction = {
  type: typeof SHOW_ERRORS
  payload: {
    msg: string
    status?: number
  }
}

export type ClearErrorAction = {
  type: typeof CLEAR_ERRORS
}

export type ShowValidationAction = {
  type: typeof SHOW_VALIDATIONS
}

export type ClearValidationAction = {
  type: typeof CLEAR_VALIDATIONS
}

export type GetIncomeAction = {
  type: typeof GET_INCOME
  payload: {
    calendar: CalendarScheduler
    income: Income[]
  }
}

export type AddIncomeAction = {
  type: typeof ADD_INCOME
  payload: {
    income: Income[]
  }
}

export type UpdateIncomeAction = {
  type: typeof UPDATE_INCOME
  payload: {
    income: Income[]
  }
}

export type DeleteIncomeAction = {
  type: typeof DELETE_INCOME
  payload: {
    income: Income[]
  }
}

export type GetExpensesAction = {
  type: typeof GET_EXPENSES
  payload: {
    calendar: CalendarScheduler
    selectedYear: any
    selectedMonth: any
    dailyExpenses: DailyExpense
  }
}

export type AddExpenseAction = {
  type: typeof ADD_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyExpense: any
  }
}

export type EditExpenseAction = {
  type: typeof EDIT_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyExpense: any
  }
}

export type DeleteExpenseAction = {
  type: typeof DELETE_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyExpense: any
  }
}

export type TotalExpenseAction = {
  type: typeof CALCULATE_TOTALEXPENSES
  payload: {
    total: number
  }
}

export type UserActions =
  | RegisterUserSuccessAction
  | RegisterFailAction
  | LoginUserSuccessAction
  | LogoutAction
  | UpdateUserAction
  | ForgotPasswordAction
  | ResetPasswordAction
  | ClearEmailConfirmationAction
  | ClearResetPasswordConfirmationAction

export type ErrorActions = ShowErrorAction | ClearErrorAction
export type ValidationActions = ShowValidationAction | ClearValidationAction 

export type CalendarActions = GetIncomeAction

export type IncomeActions =
  | GetIncomeAction
  | AddIncomeAction
  | UpdateIncomeAction
  | DeleteIncomeAction

export type ExpensesActions =
  | GetExpensesAction
  | AddExpenseAction
  | EditExpenseAction
  | DeleteExpenseAction
  | TotalExpenseAction

export type UserState = {
  user: User
  token: string
  isAuthenticated?: boolean
  forgotPasswordEmailMsg: string
  resetPasswordMsg: string
}

export type IncomeState = {
  calendar: CalendarScheduler
  income: Income[]
}

export type ExpensesState = {
  calendar: CalendarScheduler
  selectedYear: any
  selectedMonth: any
  dailyExpenses: DailyExpense
  total: number
}

export type ErrorState = {
  msg: any
  status?: any
}

export type ValidationState = {
  validated: boolean
}

export type AppState = {
  product: ProductState
  ui: UiState
  user: UserState
  error: ErrorState
  validation: ValidationState
  income: IncomeState
  expenses: ExpensesState
}
