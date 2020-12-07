import React from 'react';
import axios from 'axios'
import { useQuery } from 'react-query';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
const initial = [
  {
    id: 1,
    type: "credit",
    amount: 2000,
    effectiveDate: new Date()
  },
  {
    id: 2,
    type: "credit",
    amount: 4000,
    effectiveDate: new Date()
  }
]

const fetchTransactions = async () => {
  const requestOptions = {
    method: 'get',
  };

  try {
    const url = "http://localhost:4000/api/v1/transactions";
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }

}
const TransactionsList = () => {
  // custom hook for data fetching and manage state
  const { data , status } = useQuery('transactions', fetchTransactions);
  console.log("data: ", data);




  return (
    <React.Fragment>
      { status === 'loading' && (<div>Cargando datos...</div>)}
      { status === 'error' && (<div>Error al buscar datos...</div>)}
      { status === 'success' && (
        <Accordion>
          { data && data.map( item =>
          <Card key={item.id}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              <p>Type: {item.type}</p>
              <p>Amount: ${item.amount}</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Type: {item.type}</p>
                <p>Amount: ${item.amount}</p>
                <p>Date: {item.effectiveDate.toString()}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion>
      )}
    </React.Fragment>
  );
}

export default TransactionsList;