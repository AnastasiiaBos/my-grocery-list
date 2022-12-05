import { Component } from "react";
import imageCheck from './check.png';
import imageDelete from './delete.png';

export class GroceryList extends Component {
    state = {
        inputText: '',
        itemsList: [],
        disableButton: true,
        disableDeleteButton: true,
        crossedItem: false
    }

    handlerInput(text) {
        this.setState({inputText: text});

        if (text.trim() !== '') {
            this.setState({disableButton: false});
        } else {
            this.setState({disableButton: true});
        }
    }

    addItem(item) {
        this.setState({disableButton: true});

        if (item.trim() !== '') {
            let listArray = this.state.itemsList;
            listArray.push({name: item, itemState: 'notCrossed'});
            this.setState({
                itemsList: listArray,
                inputText: '',
            })
        }

        this.setState({disableDeleteButton: false});
    }

    itemCrossed(index) {
        let listArray = this.state.itemsList;
        if (listArray[index].itemState === 'notCrossed') {
            listArray[index].itemState = 'crossed';
            
        } else {
            listArray[index].itemState = 'notCrossed';
        }
        this.setState({
            itemsList: listArray,
        })
    }

    itemDeleted(index) {
        let listArray = this.state.itemsList;
        listArray.splice(index, 1);
        this.setState({
            itemsList: listArray,
        })

        if (listArray.length === 0) {
            this.setState({
                disableDeleteButton: true
            })
        }
    }

    handlerDeleteList() {
        let listArray = this.state.itemsList;
        listArray = [];
        this.setState({
            itemsList: listArray,
            disableDeleteButton: true
        })
    }

    handlerChangeForm (evt) {
        evt.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handlerChangeForm}>
                    <div className='inputContainer'>
                        <input 
                        type='text' 
                        placeholder="What would like to buy?" 
                        value={this.state.inputText}
                        onChange={(evt) => this.handlerInput(evt.target.value)} />

                        <div className='btnContainer'>
                            <button className={this.state.disableButton ? 'disabled' : 'active'} 
                            onClick={() => this.addItem(this.state.inputText)}
                            disabled={this.state.disableButton}>Add</button>

                            <button className={this.state.disableDeleteButton ? 'disabled' : 'activeDelete'}
                            onClick={() => this.handlerDeleteList()}
                            disabled={this.state.disableDeleteButton}>Clean list</button>
                        </div>
                    </div>
                    <ul>
                        {this.state.itemsList.map( (item, index) => (
                            
                            <div key={index} className='liContainer'>
                                <li className={item.itemState}>{item.name}</li>
                                <div className='imgContainer'>
                                    <img src={imageCheck} onClick={() => this.itemCrossed(index)} width='20px' alt='Cross an item'/>
                                    <img src={imageDelete} onClick={() => this.itemDeleted(index)} width='20px' alt='Delete an item'/>
                                </div>
                            </div>
                        )
                        )}
                    </ul>
                </form>
            </div>
        )
    }
}