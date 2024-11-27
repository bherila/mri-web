using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common;

namespace SignupCenter
{
	[Table("mr_q")]
	public sealed class SurveyQuestion : TableEntityExt
	{
		public const string GlobalPartitionKey = "Question";

		public SurveyQuestion()
		{
			PartitionKey = SurveyQuestion.GlobalPartitionKey;
			QuestionId = Guid.NewGuid();
		}

		[Key]
		[Column("q_id")]
		public Guid QuestionId
		{
			get => RowKey.ToGuid();
			set => RowKey = value.ToString("d");
		}

		[Column("q_show_if_q_id")] public Guid QuestionShowIf { get; set; }
		[Column("q_show_if_answer")] public string QuestionShowIfAnswer { get; set; }
		[Column("q_question")] public string QuestionText { get; set; }
		[Column("q_type")] public string QuestionType { get; set; }
		[Column("q_required")] public bool IsRequired { get; set; }
		[Column("q_hidden")] public bool IsHidden { get; set; }
		[Column("q_order")] public int Order { get; set; }

		public override string TableName => "mrquestion";
	}

	public class SurveyAnswer
	{
		public Guid QuestionId { get; set; }
		public string Answer { get; set; }
	}
}