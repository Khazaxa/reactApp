using Core.Database;
using Domain.Images.Entities;

namespace Domain.Images.Repositories;

public interface IImageRepository : IEntityRepository<Image>
{
    IQueryable<Image> Query();
}