import React from 'react';
import ResultModal from '../ResultModal';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      result: ''
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  checkAnswer(userAnswer) {
    if (userAnswer === this.props.data.correct) {
      this.props.addScore();
      this.setState({ answered: true, result: 'correct' });
    } else {
      this.setState({ answered: true, result: 'incorrect' });
    }
  }

  handleNewQuestion() {
    this.setState({ answered: false, result: '' });
  }

  handleClick(evt) {
    evt.preventDefault();
    this.checkAnswer(evt.target.value);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.answered ? <ResultModal answered={this.state.answered}
          nextQuestion={this.props.nextQuestion}
          currQuestionIdx={this.props.currQuestionIdx}
          handleNewQuestion={this.handleNewQuestion}
          result={this.state.result}
          correctAnswer={this.props.data.correct}
        /> : ''}

        <h2 className="question">{this.props.data.question}</h2>
        {this.props.data.choices.map((answer, idx) =>
          <p key={`${answer}-${idx}`}><button className="btn btn-light answer-btn"
            onClick={this.handleClick}
            value={answer}>{answer}</button></p>
        )}
      </React.Fragment>
    )
  }
}

export default Question;