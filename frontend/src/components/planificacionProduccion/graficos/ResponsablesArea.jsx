import * as echarts from 'echarts';
import React, { useEffect } from 'react';

const TreeChart = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, 'dark');

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

        let procesoPrincipal = responsablesMap[item.Nombre].children.find(
          (child) => child.name === item.procesosBuscar
        );

        if (!procesoPrincipal) {
          procesoPrincipal = {
            name: item.procesosBuscar,
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
          left: '15%', // Ajusta el espacio para controlar el largo horizontal
          bottom: '5%',
          right: '20%',
          layout: 'orthogonal', // Cambia a 'radial' si quieres distribución circular
          orient: 'LR', // 'LR' para izquierda a derecha, 'TB' para arriba hacia abajo
          symbolSize: 0,
          gap:1,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
            
            // fontWeight: 'bold',
            overflow: 'break',
            width: 200,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              fontSize: 12,
              // fontWeight: 'bold',
              overflow: 'break',
              width: 200,
            },
          },
          lineStyle: {
            width: 1, // Grosor de las líneas
            color: '#ccc',
            
            curveness: 0.5, // Hace que las líneas sean curvas, puedes ajustarlo según el largo
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
          expandAndCollapse: true,
          // initialTreeDepth: -1, // Muestra todos los niveles
          animationDuration: 75,
          animationDurationUpdate: 75,
        },
      ],
    });

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="main" style={{ width: '100%', height: '100%' }}></div>;
};

export default TreeChart;
