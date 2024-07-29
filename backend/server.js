const express = require('express');
const paypal = require('paypal-rest-sdk');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(cors());

paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'Ae845BvCit7xWzFtVFbc2EjVV9-0epEamnYRnfArwURaO9JiUJiTlFPol0JUpC8vJVW2PZbFvM4cjYds',
    'client_secret': 'ENUarKCw4yAqwnalfyIjn2Y2r0_KDABVX2BMZWkKtHtNss-g1mP57FyjmZKWlXf6q-LBxy2-lEc7wi32'
});


app.post('/payment', async (req, res) => {

    let data
    try {

        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/home",
                "cancel_url": "http://localhost:3000/home"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "This is the payment description."
            }]
        };


        await paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                // console.log(payment);
                data = payment;
                res.json(data);

            }
        });


    } catch (error) {
        console.log(error);
    }
})



app.get('/success', async (req, res) => {

    try {

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        }


        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error)
                return res.redirect("http://localhost:3000/failed");
            } else {
                console.log("Execute Payment Response");
                // console.log(payment);
                const response = JSON.stringify(payment);
                const parsedResponse = JSON.parse(response);

                const transactions = parsedResponse.transactions[0];

                console.log("transactions", transactions);

                return res.redirect("http://localhost:3000/success");
            }
        })


    } catch (error) {
        console.log(error);
    }

})


app.get('/failed', async (req, res) => {

    return res.redirect("http://localhost:3000/failed");
})
app.use(express.static(path.join(__dirname,'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build','index.html'));
});
// Start the server
app.listen(8000, () => {

    console.log('Server is running on port 8000');
});
