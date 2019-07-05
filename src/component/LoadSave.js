import React, { Component } from 'react'
import { connect } from 'react-redux';
import Action from '../actions';
import save from '../asset/icon/save.svg'
import load from '../asset/icon/upload.svg'
import "../asset/css/LoadSave.css"


class LoadSave extends Component {

    handleSaveToPC = () => {
        const schedule = this.props.schedule
        const fileData = JSON.stringify(schedule);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${this.props.name}.json`;
        link.href = url;
        link.click();
    }


    onReaderLoad(file) {
        var obj = JSON.parse(file.result);
        console.log(obj)
        // alert_data(obj.name, obj.family);
    }

    handleUploadFile = (event) => {
        const file = event.target.files[0]
        var reader = new FileReader();
        var json
        reader.readAsText(file);
        reader.onload = e => {
            try {
                json = JSON.parse(e.target.result);
                console.log(json)
                this.props.loadSchedule(json)
            } catch (ex) {
                alert('cannot readfile ' + ex);
            }
        };
    }

    render() {
        return (
            <div className="load-save">
                <div className="save">
                    <img src={save} alt="save" height="50" onClick={this.handleSaveToPC} />
                    <h6 className="title">SAVE</h6>
                </div>
                <div className="load">
                    <label htmlFor="file-input">
                        <img src={load} alt="load" height="50" />
                        <h6 className="title">LOAD</h6>
                    </label>
                    <input id="file-input" type="file" onChange={this.handleUploadFile.bind(this)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: state.addSubject.name,
    schedule: state.schedule.schedule,

})
const mapDispatchToProps = dispatch => ({
    loadSchedule: schedule => dispatch({ type: Action.LOADSCHEDULE, schedule })
})
export default connect(mapStateToProps, mapDispatchToProps)(LoadSave);