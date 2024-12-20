import instance, { jindai3adminInstance } from "./axios";

// DTO类型定义
export interface InvestmentPromotionUnitDTO {
  id: string;
  type: 'SELL' | 'RENT' | 'NOT_SELL' | 'NOT_RENT';
  unit: number;
  area: number;
  createdAt: string;
  updatedAt: string;
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
export function convertToVO(dtoList: InvestmentPromotionUnitDTO[]): InvestmentPromotionUnitVO {
  // 初始化统计数据
  const rentData = {
    rented: { buildings: 0, area: 0 },
    unrented: { buildings: 0, area: 0 }
  };
  
  const sellData = {
    sold: { buildings: 0, area: 0 },
    unsold: { buildings: 0, area: 0 }
  };

  // 统计数据
  dtoList.forEach(item => {
    switch (item.type) {
      case 'RENT':
        rentData.rented.buildings += item.unit;
        rentData.rented.area += item.area;
        break;
      case 'NOT_RENT':
        rentData.unrented.buildings += item.unit;
        rentData.unrented.area += item.area;
        break;
      case 'SELL':
        sellData.sold.buildings += item.unit;
        sellData.sold.area += item.area;
        break;
      case 'NOT_SELL':
        sellData.unsold.buildings += item.unit;
        sellData.unsold.area += item.area;
        break;
    }
  });

  // 计算百分比
  const rentedPercentage = rentData.rented.buildings + rentData.unrented.buildings === 0 ? 0 :
    (rentData.rented.buildings / (rentData.rented.buildings + rentData.unrented.buildings)) * 100;
  
  const soldPercentage = sellData.sold.buildings + sellData.unsold.buildings === 0 ? 0 :
    (sellData.sold.buildings / (sellData.sold.buildings + sellData.unsold.buildings)) * 100;

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
        number1: rentData.rented.buildings.toString(),
        unit1: "栋",
        number2: rentData.rented.area.toString(),
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
        number1: rentData.unrented.buildings.toString(),
        unit1: "栋",
        number2: rentData.unrented.area.toString(),
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
        number1: sellData.sold.buildings.toString(),
        unit1: "栋",
        number2: sellData.sold.area.toString(),
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
        number1: sellData.unsold.buildings.toString(),
        unit1: "栋",
        number2: sellData.unsold.area.toString(),
        unit2: "m²",
        color: "#ffffff",
      },
    ],
    rentedPercentage,
    soldPercentage
  };
}

// API请求函数
const url = "investmentPromotionUnitStatistics/all"; // 等待后端提供接口

export const getInvestmentPromotionUnitStatistics = async (): Promise<InvestmentPromotionUnitVO> => {
  try {
    const res = await jindai3adminInstance.get<InvestmentPromotionUnitDTO[]>(url);
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