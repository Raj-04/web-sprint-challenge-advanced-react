import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { screen, render, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render (<CheckoutForm />)
    const header = screen.getByText(/checkout form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/checkout form/i)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />);
    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    
    userEvent.type(firstName,"Raj");
    userEvent.type(lastName,"Patel");
    userEvent.type(address,"1000 Fords Pointe Circle");
    userEvent.type(city,"Savannah");
    userEvent.type(state,"Georgia");
    userEvent.type(zip,"31419");

    const button = screen.getByRole("button");
    userEvent.click(button);


    await waitFor(()=>{
        const successMessages = screen.queryByTestId("successMessage");
        expect(successMessages).toBeInTheDocument();
    })

});
