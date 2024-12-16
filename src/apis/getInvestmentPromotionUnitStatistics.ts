import instance from "./axios";

// DTO类型定义
export interface InvestmentPromotionUnitDTO {
  rentData: {
    rented: {
      buildings: number;
      area: number;
    };
    unrented: {
      buildings: number; 
      area: number;
    };
    rentedPercentage: number;
  };
  sellData: {
    sold: {
      buildings: number;
      area: number;  
    };
    unsold: {
      buildings: number;
      area: number;
    };
    soldPercentage: number;
  };
}

// VO类型定义
export interface InvestmentPromotionUnitVO {
  statisticsBoxPositionRent: {
    boxStyle: {
      width: string;
      height: string;
      top: string;
      left: string;
    };
    title: string;
    number1: string;
    unit1: string;
    number2: string;
    unit2: string;
    color: string;
  }[];
  statisticsBoxPositionSell: {
    boxStyle: {
      width: string;
      height: string;
      top: string;
      left: string;
    };
    title: string;
    number1: string;
    unit1: string;
    number2: string;
    unit2: string;
    color: string;
  }[];
  rentedPercentage: number;
  soldPercentage: number;
}

// DTO到VO的转换函数
export function convertToVO(dto: InvestmentPromotionUnitDTO): InvestmentPromotionUnitVO {
  return {
    statisticsBoxPositionRent: [
      {
        boxStyle: {
          width: "39px",
          height: "33px",
          top: "4px",
          left: "0px",
        },
        title: "已租",
        number1: dto.rentData.rented.buildings.toString(),
        unit1: "栋",
        number2: dto.rentData.rented.area.toString(),
        unit2: "m²",
        color: "#a5d8fc",
      },
      {
        boxStyle: {
          width: "39px",
          height: "33px",
          top: "4px",
          left: "60px",
        },
        title: "未租",
        number1: dto.rentData.unrented.buildings.toString(),
        unit1: "栋",
        number2: dto.rentData.unrented.area.toString(),
        unit2: "m²",
        color: "#ffffff",
      },
    ],
    statisticsBoxPositionSell: [
      {
        boxStyle: {
          width: "39px",
          height: "33px",
          top: "4px",
          left: "0px",
        },
        title: "已售",
        number1: dto.sellData.sold.buildings.toString(),
        unit1: "栋",
        number2: dto.sellData.sold.area.toString(),
        unit2: "m²",
        color: "#fee186",
      },
      {
        boxStyle: {
          width: "39px",
          height: "33px",
          top: "4px",
          left: "60px",
        },
        title: "未售",
        number1: dto.sellData.unsold.buildings.toString(),
        unit1: "栋",
        number2: dto.sellData.unsold.area.toString(),
        unit2: "m²",
        color: "#ffffff",
      },
    ],
    rentedPercentage: dto.rentData.rentedPercentage,
    soldPercentage: dto.sellData.soldPercentage
  };
}

// API请求函数
const url = ""; // 等待后端提供接口

export const getInvestmentPromotionUnitStatistics = async (): Promise<InvestmentPromotionUnitVO> => {
  try {
    const res = await instance.get<InvestmentPromotionUnitDTO>(url);
    return convertToVO(res.data);
  } catch (error) {
    console.error("获取招商单元统计数据失败:", error);
    // 返回默认值
    return {
      statisticsBoxPositionRent: [
        {
          boxStyle: {
            width: "39px",
            height: "33px",
            top: "4px",
            left: "0px",
          },
          title: "已租",
          number1: "0",
          unit1: "栋",
          number2: "0",
          unit2: "m²",
          color: "#a5d8fc",
        },
        {
          boxStyle: {
            width: "39px",
            height: "33px",
            top: "4px",
            left: "60px",
          },
          title: "未租", 
          number1: "0",
          unit1: "栋",
          number2: "0",
          unit2: "m²",
          color: "#ffffff",
        },
      ],
      statisticsBoxPositionSell: [
        {
          boxStyle: {
            width: "39px",
            height: "33px",
            top: "4px",
            left: "0px",
          },
          title: "已售",
          number1: "0",
          unit1: "栋", 
          number2: "0",
          unit2: "m²",
          color: "#fee186",
        },
        {
          boxStyle: {
            width: "39px",
            height: "33px",
            top: "4px",
            left: "60px",
          },
          title: "未售",
          number1: "0",
          unit1: "栋",
          number2: "0",
          unit2: "m²",
          color: "#ffffff",
        },
      ],
      rentedPercentage: 0,
      soldPercentage: 0
    };
  }
}; 