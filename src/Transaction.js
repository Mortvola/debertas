import React, {useState} from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {CategoryInput} from './CategoryInput';
import Amount from './Amount';
import {updateTransactionCategory, TransactionDialog} from './TransactionDialog';


function getTransactionAmountForCategory(transaction, categoryId) {
    let amount = transaction.amount;
    
    if (transaction.categories !== undefined && transaction.categories !== null &&
        categoryId !== undefined && categoryId !== null) {
        
        let index = transaction.categories.findIndex (c => c.categoryId == categoryId);
        if (index != -1) {
            amount = transaction.categories[index].amount;
        }
    }
    
    return amount;
}

class Transaction extends React.Component {
    constructor (props) {
        super (props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick () {
        this.props.onClick(this.props.transaction.id)
    }
    
    handleEditClick () {
        this.props.onEditClick(this.props.transaction.id);
    }
    
    handleChange (categoryId) {

        let request = { splits: [] };
        
        request.splits.push({categoryId: categoryId, amount: this.props.transaction.amount });
        
        updateTransactionCategory (this.props.transaction, request);
    }
    
    renderCategoryButton () {
        let transaction = this.props.transaction;
        let categoryId = "";
        
        if (transaction.categories) {
            if (transaction.categories.length > 1) {
                return <button className='split-button' onClick={this.handleEditClick}>Split</button>
            }
            
            categoryId = transaction.categories[0].categoryId;
        }
        
        return <CategoryInput categoryId={categoryId} onChange={this.handleChange}/>
    }
    
    render () {
        let {transaction, amount, balance, selected} = this.props;
        
        let className = "transaction";
        if (selected) {
            className += " transaction-selected";
        }
        
        return (
            <div className={className} onClick={this.handleClick}>
                <IconButton icon='edit' onClick={this.handleEditClick}/>
                <div>{transaction.date}</div>
                <div className='transaction-field'>{transaction.name}</div>
                <div className='trans-cat-edit'>
                    {this.renderCategoryButton ()}
                    <ModalLauncher
                        launcher={IconButton}
                        launcherProps={{icon: 'list-ul'}}
                        dialog={TransactionDialog}
                        dialogProps={{transaction: this.props.transaction, categoryContext: this.props.categoryContext}}
                    />
                </div>
                <Amount className='transaction-field amount currency' amount={amount} />
                <Amount className='transaction-field balance currency' amount={balance} />
                <div className='transaction-field'>{transaction.institute_name}</div>
                <div className='transaction-field'>{transaction.account_name}</div>
            </div>);
    }
}

Transaction.propTypes = {
    onClick: PropTypes.func,
    onEditClick: PropTypes.func,
    transaction: PropTypes.object,
    amount: PropTypes.number,
    balance: PropTypes.number,
    selected: PropTypes.bool,
    categoryContext: PropTypes.number,
}

function ModalLauncher ({launcherProps, dialogProps, ...props}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Launcher = props.launcher;
    const Dialog = props.dialog;

    return (
        <>
        <Launcher onClick={handleShow} {...launcherProps} />
        <Dialog show={show} handleClose={handleClose} {...dialogProps} />
        </>
    );
}

ModalLauncher.propTypes = {
    launcher: PropTypes.func,
    launcherProps: PropTypes.object,
    dialog: PropTypes.func,
    dialogProps: PropTypes.object
}

export {Transaction, getTransactionAmountForCategory};
