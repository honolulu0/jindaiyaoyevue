import axiosInstance from "./axios";

export const getAlertSummary = async () => {
  const thisYear = await axiosInstance.get("/park_api/alerts/alert_summary");
  const lastYear = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      start_time: `${new Date().getFullYear() - 1}-01-01T00:00:00.000Z`,
      end_time: `${new Date().getFullYear() - 1}-12-31T23:59:59.999Z`
    }
  });
  return {
    thisYear: thisYear.data,
    lastYear: lastYear.data
  };
};

export interface AlertSummaryMonth {
  code: number;
  message: string;
  data: {
    stats: {
      month: number;
      total_count: number;
      total_processed: number;
      unprocessed_count: number;
    }[];
    totals: {
      total_count: number;
      total_processed: number;
      total_unprocessed: number;
    };
  };
}

export const getAlertSummaryMonth = async () => {
  const thisYear1 = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 8
    }
  });
  const thisYear2 = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 10
    }
  });
  const thisYear3 = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 5,
    }
  }) as AlertSummaryMonth;
  const thisYear4 = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 4
    }
  }) as AlertSummaryMonth;
  return {
    "烟感报警": thisYear1.data.stats,
    "消防管廊": thisYear2.data.stats,
    "智能井盖": thisYear3.data.stats,
    "车辆道闸": thisYear4.data.stats
  };
};

export const getAlertDistributionBoxSummary= async () => {
  const thisYear = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 11
    }
  });
  const lastYear = await axiosInstance.get("/park_api/alerts/alert_summary", {
    params: {
      device_type_id: 11,
      start_time: `${new Date().getFullYear() - 1}-01-01T00:00:00.000Z`,
      end_time: `${new Date().getFullYear() - 1}-12-31T23:59:59.999Z`
    }
  });
  return {
    thisYear: thisYear.data.stats.map((item: any) => item.total_count),
    lastYear: lastYear.data.stats.map((item: any) => item.total_count)
  };
};
