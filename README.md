# Payment page imitation for SolidGate
Deployment link : https://payment-page-six-mocha.vercel.app/

Key features of the original design were **precisecly repeated**.
Overall, I like the result of this work.

## Key features

### Translation buttons:
I added the functionality to the language switchers in the top-right corner using key-value pairs of ukrainian and english phrases.
Now all key element n the page are being translated.

### Fields validation:
Credit card number : allows only 16 digits.
YY/MM : allows only 4 digits and automatically adds the "/" between pairs of digits. + Month can only be 1-12.
CVC : allows only 3 digits.

### Info button :
When you click on it, info about CVC appears on the screen.

### Different states of the "Pay 299.99" button
Button has different states, whether or not it interacts with the mouse.
Also the spinning circle animation added, when the payment is processing and the message about the made payment appears on the screen after that.

## Important!
If you cannot see the language switchers on the top right corner, please zoom out the browser tab a bit. (CTRL + mouse wheel || CTRL + "-").
