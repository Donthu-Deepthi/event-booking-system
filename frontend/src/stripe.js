import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    "pk_test_51T4JbjB7izLXu6V0BK2k78JMFLRLjps76UOE4GRxX3QH3pBTzhXzrUxDo3l9V4QkQgk8LSy4p2pCzX4H5CKRty2H00TtazVp3s"
);