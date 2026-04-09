import { createContext, useReducer, useEffect } from "react";

export const ExpenseContext = createContext();

const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
const storedBudget = Number(localStorage.getItem("budget")) || 0;
const storedIncome = Number(localStorage.getItem("income")) || 0;
const storedCategoryBudgets =
  JSON.parse(localStorage.getItem("categoryBudgets")) || {};

const initialState = {
  expenses: storedExpenses,
  budget: storedBudget,
  income: storedIncome,
  categoryBudgets: storedCategoryBudgets
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case "DELETE":
      return {
        ...state,
        expenses: state.expenses.filter(e => e.id !== action.payload)
      };

    case "SET_BUDGET":
      return { ...state, budget: action.payload };

    case "SET_INCOME":
      return { ...state, income: action.payload };

    case "SET_CATEGORY_BUDGET":
      return {
        ...state,
        categoryBudgets: {
          ...state.categoryBudgets,
          [action.payload.category]: action.payload.amount
        }
      };

    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("budget", state.budget);
    localStorage.setItem("income", state.income);
    localStorage.setItem(
      "categoryBudgets",
      JSON.stringify(state.categoryBudgets)
    );
  }, [state]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}
