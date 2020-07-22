import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Input, Col,Row } from "reactstrap";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };
  static defaultProps = {
    suggestions: [],
  };
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      id:null,
    };
  }
  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };
  returnId = () => {
    return this.state.id;
  }
  removeId = (id) => {
    var idArr = document.getElementById(this.props.id).value.split(",");
    const index = idArr.indexOf(id);
    if (index > -1) {
      idArr.splice(index, 1);
    }
    document.getElementById(this.props.id).value = idArr.join();
  };
  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      id: e.currentTarget.id,
      userInput: e.currentTarget.firstChild.firstChild.innerText,
    });
    if(this.props.setId) this.props.setId(e.currentTarget.id);
  };
  setData = (data) => {
    this.setState({
      id: this.props.suggestions.filter((e) => e.Name == data)[0].id,
      userInput: data,
    });
  }
  setDataUsingId = (Id) => {
    this.setState({
      id: this.props.suggestions.filter((e) => e.id == Id)[0].id,
      userInput: this.props.suggestions.filter((e) => e.id == Id)[0].Name,
    });
  }
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        var fieldLength = document.getElementById(this.props.id).clientWidth;
        suggestionsListComponent = (
          <div className="row">
            <ul
              class={`suggestions ${this.props.className}`}
              style={{ width: fieldLength }}
            >
              {filteredSuggestions.map((suggestion, index) => {
                let className;
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                console.log(suggestion);
                return (
                  <li
                    className={className}
                    key={suggestion.id}
                    id={suggestion.id}
                    onClick={onClick}
                  >
                    <Row>
                      <Col md="6">{suggestion.Name}</Col>
                      {suggestion.Phone != undefined ?  <Col md="6">
                        <em>{suggestion.Phone}</em>
                      </Col> : null}
                    </Row>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        var fieldLength = document.getElementById(this.props.id).clientWidth;
        suggestionsListComponent = (
          <div className="row justify-content-center">
            <ul class="suggestions" style={{ width: fieldLength }}>
              <li>
                <em>No suggestions (or wait)</em>
              </li>
            </ul>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <Input
          type="text"
          class="form-control d-xl-flex"
          id={this.props.id}
          placeholder={this.props.hint == null ? "Name" : this.props.hint}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={{
            marginTop: this.props.marginTop || "17px",
            paddingLeft: "12px",
            marginBottom: "0px",
            Height: "38px",
            paddingBottom: "7px",
            width: "100%",
            paddingRight: "19px",
          }}
          value={userInput}
        />
        <div className="row">{suggestionsListComponent}</div>
      </Fragment>
    );
  }
}

export default Autocomplete;
