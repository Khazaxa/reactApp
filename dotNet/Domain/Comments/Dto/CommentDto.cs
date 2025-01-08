namespace Domain.Comments.Dto;

public record CommentDto(
    string Content,
    string Author,
    int PostId);