import gql from "graphql-tag"

export const TOTAL_INCOME = gql`
	{
		totalIncome
	}
`

export const GET_INCOMES = gql`
	{
		me {
			incomes {
				id
				name
				amount
				type
				payDate
			}
		}
	}
`

export const ME = gql`
	{
		me {
			name
		}
	}
`
