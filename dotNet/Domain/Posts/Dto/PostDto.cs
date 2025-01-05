namespace Domain.Posts.Dto;

public record PostDto(
    string Title,
    string Content,
    string Author);