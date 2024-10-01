using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using eHealthTotalAPI.DTOs;
using eHealthTotalAPI.Models;

namespace eHealthTotalAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping for Product to ProductDto
            CreateMap<Product, ProductDto>();
                // .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
                // .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category.Id));
                // .ForMember(dest => dest.NutrientName, opt => opt.MapFrom(src => src.Category.NutrientName));


            // Mapping for ProductDto to Product
            CreateMap<ProductDto, Product>()
                .ForMember(dest => dest.Category, opt => opt.Ignore());

            // Mapping for Cart to CartDto
            CreateMap<Cart, CartDto>()
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.Name))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.ProductPrice, opt => opt.MapFrom(src => src.Product.Price))
                .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Product.Stock)); 

            // Mapping for CartDto to Cart
            CreateMap<CartDto, Cart>()
                .ForMember(dest => dest.Customer, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore());

            // Mapping for Order to OrderDto
            CreateMap<Order, OrderDTO>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.ProductPrice, opt => opt.MapFrom(src => src.Product.Price));

            // Mapping for OrderDto to Order
            CreateMap<OrderDTO, Order>()
                .ForMember(dest => dest.Product, opt => opt.Ignore()); // Assuming Product will be set separately if needed

                //monil
            CreateMap<User, UserDto>();
            CreateMap<RegisterModel, User>();
        }
    }
}