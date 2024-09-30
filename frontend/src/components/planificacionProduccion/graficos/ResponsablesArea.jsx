import * as echarts from 'echarts';
import React, { useEffect } from 'react';

const TreeChart = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    
    const processData = (data) => {
      const treeData = {
        name: 'Producción',
        children: [],
      };

      const responsablesMap = {};

      data.forEach((item) => {
        if (!responsablesMap[item.Nombre]) {
          responsablesMap[item.Nombre] = {
            name: item.Nombre,
            children: [],
          };
          treeData.children.push(responsablesMap[item.Nombre]);
        }

        // Usar el nombre completo del proceso en lugar de solo la primera parte
        let procesoPrincipal = responsablesMap[item.Nombre].children.find(
          (child) => child.name === item.procesosBuscar
        );

        if (!procesoPrincipal) {
          procesoPrincipal = {
            name: item.procesosBuscar, // Cambiado a nombre completo
            children: [],
          };
          responsablesMap[item.Nombre].children.push(procesoPrincipal);
        }

        const cantidadPlanificada = Math.round(item.cantidad_planificada ?? 0);
        const producido = Math.round(item.producido ?? 0);

        procesoPrincipal.children.push({
          name: `${item.procesosBuscar} (Planificado: ${cantidadPlanificada}, Producido: ${producido})`,
          value: cantidadPlanificada,
        });
      });

      return treeData;
    };

    const treeData = processData(data);

    myChart.showLoading();
    myChart.hideLoading();

    myChart.setOption({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          top: '5%',
          left: '15%',
          bottom: '5%',
          right: '20%',
          symbolSize: 10,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
            fontWeight: 'bold',
            overflow: 'break',
            width: 200,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              fontSize: 12,
              fontWeight: 'bold',
              overflow: 'break',
              width: 200,
            },
          },
          emphasis: {
            focus: 'descendant',
            itemStyle: {
              color: '#ff6600',
              borderWidth: 2,
              borderColor: '#ff6600',
            },
            label: {
              fontSize: 12,
              fontWeight: 'bold',
            },
          },
          blur: {
            itemStyle: {
              opacity: 0.3,
            },
            label: {
              opacity: 0.5,
            },
          },
          expandAndCollapse: true,
          animationDuration: 750,
          animationDurationUpdate: 750,
        },
      ],
    });

    return () => {
      myChart.dispose(); // Limpiar el gráfico al desmontar el componente
    };
  }, [data]);

  return <div id="main" style={{ width: '100%', height: '100%' }}></div>;
};

export default TreeChart;
