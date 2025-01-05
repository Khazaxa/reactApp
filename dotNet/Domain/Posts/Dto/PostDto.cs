namespace Domain.Posts.Dto;

public record PostDto(
    int Id,
    string Title,
    string Content,
    string Author);