namespace plannr.DTOs;

public class GetAllProductsDto
{
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public string Category { get; set; }
    public string SubCategory { get; set; }
    public double PricePerUnit { get; set; }

    public GetAllProductsDto()
    {
        
    }
}