import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from '../../node_modules/ngx-bootstrap/modal';
import { QuestionClass } from './question-class';
import { ToastrService } from 'ngx-toastr';




@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
	questionObj = new QuestionClass();
	@ViewChild('submitModal', { static: true }) submitModal: ModalDirective;
	@ViewChild('addQuestionModal', { static: true }) addQuestionModal : ModalDirective;
	@ViewChild('answerModal', { static: true }) answerModal : ModalDirective;
	@ViewChild('questionForm', { static: true }) questionForm: any;
	@ViewChild('questionTest', { static: true }) questionTest : any;

	constructor( private toastr: ToastrService) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": "Which of the following is not a keyword in java?",
		"a": "static",
		"b": "Boolean",
		"c": "void",
		"d": "private",
		"answer": "b"
	},
	{
		"id": 2,
		"question": "What is the default value of double variable?",
		"a": "0.0d",
		"b": "0.0f",
		"c": "0",
		"d": "not defined",
		"answer": "a"
	},
	{
		"id": 3,
		"question": "Which arithmetic operations can result in the throwing of an ArithmeticException?",
		"a": "/ , %",
		"b": "* , +",
		"c": "! , -",
		"d": ">> , <<",
		"answer": "a"
	}
	];

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
					this.rightAnswer++;
				}
			}

		}
		this.submitModal.show();

	}

	startQuiz() {
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i]) {
				delete this.allQuestions[i]["selected"];
			}

		}
		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	HomePage() {
		this.isQuestionCardShow = false;
	}
	addQuestion(){
		this.addQuestionModal.show();
	}
	submitAddQuestion(){
		let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
		quesTemp["id"] = this.allQuestions.length+1;
		this.allQuestions.push(quesTemp);
		this.questionForm.reset();
		this.toastr.success("Question Added Successfully!!");
		this.addQuestionModal.hide();

	}
	checkAnswers(){
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {



	}

}
