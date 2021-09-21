import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";


function HeaderCartButton(props) {

    const [btnIsHiglighted, setBtnIsHiglighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const buttonClasses = `${classes.button} ${btnIsHiglighted ? classes.bump : ""}`

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHiglighted(true);

        const timer = setTimeout(() => {
            setBtnIsHiglighted(false);
        }, 300)

        // Cleanup function to clear timer if rapidly adding items
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;