import React, { useState } from 'react';

// ==========================================
// LINE CHART COMPONENT
// ==========================================
interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  label?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 200,
  color = '#4F46E5',
  label
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  if (!data || data.length === 0) return null;

  const width = 500;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minVal = 0;
  const maxVal = 100; // standard percentage representation
  const valRange = maxVal - minVal;

  // Calculate coordinates
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((item.value - minVal) / valRange) * chartHeight;
    return { x, y, ...item };
  });

  // Create path strings
  const pathD = points.reduce(
    (acc, p, index) => (index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const fillD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {label && <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-muted)' }}>{label}</h4>}
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * chartHeight;
          const val = Math.round(maxVal - ratio * valRange);
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="end"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - padding + 20}
            fill="var(--text-muted)"
            fontSize="10"
            textAnchor="middle"
          >
            {p.label}
          </text>
        ))}

        {/* Fill under the line */}
        {points.length > 0 && <path d={fillD} fill="url(#line-grad)" />}

        {/* The line itself */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoveredIdx === i ? 6 : 4}
            fill={hoveredIdx === i ? color : 'var(--bg-card)'}
            stroke={color}
            strokeWidth="2"
            style={{ cursor: 'pointer', transition: 'all 150ms ease' }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          />
        ))}

        {/* Tooltip Overlay */}
        {hoveredIdx !== null && (
          <g>
            <rect
              x={points[hoveredIdx].x - 35}
              y={points[hoveredIdx].y - 35}
              width="70"
              height="25"
              rx="4"
              fill="var(--text-main)"
              filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
            />
            <text
              x={points[hoveredIdx].x}
              y={points[hoveredIdx].y - 18}
              fill="var(--bg-card)"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              {points[hoveredIdx].value}%
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// BAR CHART COMPONENT
// ==========================================
interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  color = '#3B82F6'
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 500;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (chartWidth / data.length) * 0.6;
  const barGap = (chartWidth / data.length) * 0.4;

  const maxVal = Math.max(...data.map(d => d.value), 100);

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ overflow: 'visible' }}>
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * chartHeight;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--border-color)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const barHeight = (item.value / maxVal) * chartHeight;
          const x = padding + idx * (barWidth + barGap) + barGap / 2;
          const y = height - padding - barHeight;

          return (
            <g key={idx}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={hoveredIdx === idx ? 'var(--primary)' : color}
                style={{ cursor: 'pointer', transition: 'all 200ms ease' }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              <text
                x={x + barWidth / 2}
                y={height - padding + 18}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="middle"
              >
                {item.label}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                fill="var(--text-main)"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                style={{ opacity: hoveredIdx === idx ? 1 : 0.7, transition: 'opacity 200ms' }}
              >
                {item.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// PIE CHART (DONUT) COMPONENT
// ==========================================
interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 180 }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const total = data.reduce((acc, d) => acc + d.value, 0);
  let accumulatedAngle = 0;

  const radius = 60;
  const innerRadius = 40;
  const center = size / 2;

  const slices = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    
    // Calculate SVG arc coordinates
    const rad1 = ((accumulatedAngle - 90) * Math.PI) / 180;
    const rad2 = ((accumulatedAngle + angle - 90) * Math.PI) / 180;
    
    const x1 = center + radius * Math.cos(rad1);
    const y1 = center + radius * Math.sin(rad1);
    const x2 = center + radius * Math.cos(rad2);
    const y2 = center + radius * Math.sin(rad2);

    const ix1 = center + innerRadius * Math.cos(rad2);
    const iy1 = center + innerRadius * Math.sin(rad2);
    const ix2 = center + innerRadius * Math.cos(rad1);
    const iy2 = center + innerRadius * Math.sin(rad1);

    const largeArc = angle > 180 ? 1 : 0;

    const pathD = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${ix1} ${iy1}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2}
      Z
    `;

    accumulatedAngle += angle;
    return { pathD, ...item };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((slice, idx) => (
          <path
            key={idx}
            d={slice.pathD}
            fill={slice.color}
            opacity={hoveredIdx === null || hoveredIdx === idx ? 1 : 0.6}
            style={{
              cursor: 'pointer',
              transition: 'transform 200ms ease, opacity 200ms ease',
              transform: hoveredIdx === idx ? 'scale(1.05)' : 'scale(1)',
              transformOrigin: `${center}px ${center}px`
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          />
        ))}
        {/* Central Text */}
        <text
          x={center}
          y={center + 4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="var(--text-muted)"
        >
          {hoveredIdx !== null ? `${data[hoveredIdx].label}` : 'Burnout Risk'}
        </text>
        <text
          x={center}
          y={center + 20}
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill="var(--text-main)"
        >
          {hoveredIdx !== null ? `${data[hoveredIdx].value}%` : `${total}% Total`}
        </text>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              opacity: hoveredIdx === null || hoveredIdx === idx ? 1 : 0.5,
              transition: 'opacity 200ms'
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }} />
            <span style={{ fontSize: 'var(--fs-small)', fontWeight: 500 }}>
              {item.label}: <strong>{item.value}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// HEATMAP COMPONENT (DEPARTMENT COMPARISONS)
// ==========================================
interface HeatmapProps {
  departments: string[];
  drivers: string[];
  scores: Record<string, Record<string, number>>; // e.g. { 'Engineering': { 'Trust': 86, ... } }
}

export const Heatmap: React.FC<HeatmapProps> = ({ departments, drivers, scores }) => {
  const [hoveredCell, setHoveredCell] = useState<{ dept: string; driver: string; val: number } | null>(null);

  const getCellColor = (val: number) => {
    if (val >= 85) return 'var(--success-light)';
    if (val >= 75) return 'var(--secondary-light)';
    if (val >= 68) return 'var(--warning-light)';
    return 'var(--danger-light)';
  };

  const getTextColor = (val: number) => {
    if (val >= 85) return 'var(--success)';
    if (val >= 75) return 'var(--secondary)';
    if (val >= 68) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '6px',
          minWidth: '600px',
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>Department</th>
            {drivers.map(drv => (
              <th
                key={drv}
                style={{
                  textAlign: 'center',
                  padding: '8px',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 500,
                  maxWidth: '80px',
                  wordBreak: 'break-word'
                }}
              >
                {drv}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept}>
              <td style={{ fontWeight: 600, padding: '8px', fontSize: 'var(--fs-small)' }}>{dept}</td>
              {drivers.map(drv => {
                const val = scores[dept]?.[drv] || 75;
                const bgColor = getCellColor(val);
                const textColor = getTextColor(val);
                const isHovered = hoveredCell?.dept === dept && hoveredCell?.driver === drv;

                return (
                  <td
                    key={drv}
                    onMouseEnter={() => setHoveredCell({ dept, driver: drv, val })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      textAlign: 'center',
                      padding: '16px 8px',
                      backgroundColor: bgColor,
                      color: textColor,
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '15px',
                      border: isHovered ? '2px solid currentColor' : '2px solid transparent',
                      transition: 'all 200ms ease',
                      position: 'relative'
                    }}
                  >
                    {val}
                    
                    {isHovered && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translate(-50%, -8px)',
                          backgroundColor: 'var(--text-main)',
                          color: 'var(--bg-card)',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          whiteSpace: 'nowrap',
                          zIndex: 10,
                          pointerEvents: 'none',
                          boxShadow: 'var(--shadow-md)'
                        }}
                      >
                        {dept} • {drv}: {val}%
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
