export const getTotalChartConfig = () => {
    const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Graduates', 'Participants'],
            left: 'center',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Graduates',
            type: 'line',
            stack: 'Total',
            data: [20, 40, 56, 113, 145, 200, 134, 256, 188, 145, 321, 276]
          },
          {
            name: 'Participants',
            type: 'line',
            stack: 'Total',
            data: [220, 262, 188, 138, 80, 256, 188, 88, 60, 158, 170, 43]
          },
        ]
      };
      return {title: "Total Number", option};
}

export const getGenderChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Gender',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 66, name: 'Male' },
          { value: 43, name: 'Female' },
        ]
      }
    ]
  };
  return { title: 'Gender', option }
}

export const getAgeChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Age',
        type: 'pie',
        // radius: '50%',
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 25, name: '> 60' },
          { value: 66, name: '40 - 60' },
          { value: 43, name: '20 - 40' },
          { value: 8, name: '0 - 20' },
        ]
      }
    ]
  };
  return { title: 'Age', option }
}

export const getTagChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'TAG',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 25, name: 'MHD' },
          { value: 89, name: 'SUD' },
        ]
      }
    ]
  };
  return { title: 'Tag', option }
}

export const getNavigatorChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'NAVIGATOR',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 65, name: 'Jeff Ronald' },
          { value: 46, name: 'Judson Malone' },
        ]
      }
    ]
  };
  return { title: 'Navigator', option }
}

export const getOrganizationChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: ['FSCAA', 'La Red Headlth', 'Marigold', 'Net Centers', 'SPCA', 'Bone and Yarn', 'Del']
    },
    xAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
        type: 'bar'
      }
    ]
  };
  return { title: 'Organization Coverage', option}
}

export const getServiceChartConfig = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: ['Medical', 'Peer Support', 'Counceling', 'Medicaid', 'Food Stamps', 'Pet Food']
    },
    xAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          320,
          265,
          512,
          234,
          {
            value: 734,
            itemStyle: {
              color: '#a90000'
            }
          },
          124
        ],
        type: 'bar'
      }
    ]
  };
  return { title: 'Service Coverage', option}
}

export const getStatusChartConfig = () => {
  let option;
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['In progress', 'Complete', 'Failed']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'In progress',
        type: 'bar',
        data: [220, 262, 188, 138, 80, 256, 188, 88, 60, 158, 170, 43],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Complete',
        type: 'bar',
        data: [20, 40, 56, 113, 145, 200, 134, 256, 188, 145, 321, 276],
        markPoint: {
          data: [
            { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
            { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Failed',
        type: 'bar',
        data: [0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 0, 0],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      }
    ]
  };
  return {title: 'Participant Status', option}
}