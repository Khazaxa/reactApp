using Core.Cqrs;
using Domain.Images.Dtos;
using Domain.Images.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Domain.Images.Queries;

public record ImagesGetQuery() : IQuery<List<ImageDto>>;

internal class ImagesGetQueryHandler(IImageRepository imgRepository) : IQueryHandler<ImagesGetQuery, List<ImageDto>>
{

    public async Task<List<ImageDto>> Handle(ImagesGetQuery request, CancellationToken cancellationToken)
    {
        var images = imgRepository.Query()
            .Include(x => x.User)
            .Select((i) => new ImageDto(i.Id, i.Name, i.Extension, i.Size, i.Path, i.UserId))
            .ToListAsync(cancellationToken);
        return await images;
    }
}