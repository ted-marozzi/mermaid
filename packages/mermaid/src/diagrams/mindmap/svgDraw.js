import { createText } from '../../rendering-util/createText.js';
const MAX_SECTIONS = 12;

const defaultBkg = function (db, elem, node, section) {
  const rd = 5;
  elem
    .append('path')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr(
      'd',
      `M0 ${node.height - rd} v${-node.height + 2 * rd} q0,-5 5,-5 h${
        node.width - 2 * rd
      } q5,0 5,5 v${node.height - rd} H0 Z`
    );

  elem
    .append('line')
    .attr('class', 'node-line-' + section)
    .attr('x1', 0)
    .attr('y1', node.height)
    .attr('x2', node.width)
    .attr('y2', node.height);
};

const rectBkg = function (db, elem, node) {
  elem
    .append('rect')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr('height', node.height)
    .attr('width', node.width);
};

const cloudBkg = function (db, elem, node) {
  const w = node.width;
  const h = node.height;
  const r1 = 0.15 * w;
  const r2 = 0.25 * w;
  const r3 = 0.35 * w;
  const r4 = 0.2 * w;
  elem
    .append('path')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr(
      'd',
      `M0 0 a${r1},${r1} 0 0,1 ${w * 0.25},${-1 * w * 0.1}
      a${r3},${r3} 1 0,1 ${w * 0.4},${-1 * w * 0.1}
      a${r2},${r2} 1 0,1 ${w * 0.35},${1 * w * 0.2}

      a${r1},${r1} 1 0,1 ${w * 0.15},${1 * h * 0.35}
      a${r4},${r4} 1 0,1 ${-1 * w * 0.15},${1 * h * 0.65}

      a${r2},${r1} 1 0,1 ${-1 * w * 0.25},${w * 0.15}
      a${r3},${r3} 1 0,1 ${-1 * w * 0.5},${0}
      a${r1},${r1} 1 0,1 ${-1 * w * 0.25},${-1 * w * 0.15}

      a${r1},${r1} 1 0,1 ${-1 * w * 0.1},${-1 * h * 0.35}
      a${r4},${r4} 1 0,1 ${w * 0.1},${-1 * h * 0.65}

    H0 V0 Z`
    );
};

const bangBkg = function (db, elem, node) {
  const w = node.width;
  const h = node.height;
  const r = 0.15 * w;
  elem
    .append('path')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr(
      'd',
      `M0 0 a${r},${r} 1 0,0 ${w * 0.25},${-1 * h * 0.1}
      a${r},${r} 1 0,0 ${w * 0.25},${0}
      a${r},${r} 1 0,0 ${w * 0.25},${0}
      a${r},${r} 1 0,0 ${w * 0.25},${1 * h * 0.1}

      a${r},${r} 1 0,0 ${w * 0.15},${1 * h * 0.33}
      a${r * 0.8},${r * 0.8} 1 0,0 ${0},${1 * h * 0.34}
      a${r},${r} 1 0,0 ${-1 * w * 0.15},${1 * h * 0.33}

      a${r},${r} 1 0,0 ${-1 * w * 0.25},${h * 0.15}
      a${r},${r} 1 0,0 ${-1 * w * 0.25},${0}
      a${r},${r} 1 0,0 ${-1 * w * 0.25},${0}
      a${r},${r} 1 0,0 ${-1 * w * 0.25},${-1 * h * 0.15}

      a${r},${r} 1 0,0 ${-1 * w * 0.1},${-1 * h * 0.33}
      a${r * 0.8},${r * 0.8} 1 0,0 ${0},${-1 * h * 0.34}
      a${r},${r} 1 0,0 ${w * 0.1},${-1 * h * 0.33}

    H0 V0 Z`
    );
};

const circleBkg = function (db, elem, node) {
  elem
    .append('circle')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr('r', node.width / 2);
};

/**
 *
 * @param parent
 * @param w
 * @param h
 * @param points
 * @param node
 */
function insertPolygonShape(parent, w, h, points, node) {
  return parent
    .insert('polygon', ':first-child')
    .attr(
      'points',
      points
        .map(function (d) {
          return d.x + ',' + d.y;
        })
        .join(' ')
    )
    .attr('transform', 'translate(' + (node.width - w) / 2 + ', ' + h + ')');
}

const hexagonBkg = function (db, elem, node) {
  const h = node.height;
  const f = 4;
  const m = h / f;
  const w = node.width - node.padding + 2 * m;
  const points = [
    { x: m, y: 0 },
    { x: w - m, y: 0 },
    { x: w, y: -h / 2 },
    { x: w - m, y: -h },
    { x: m, y: -h },
    { x: 0, y: -h / 2 },
  ];
  const shapeSvg = insertPolygonShape(elem, w, h, points, node);
};

const roundedRectBkg = function (db, elem, node) {
  elem
    .append('rect')
    .attr('id', 'node-' + node.id)
    .attr('class', 'node-bkg node-' + db.type2Str(node.type))
    .attr('height', node.height)
    .attr('rx', node.padding)
    .attr('ry', node.padding)
    .attr('width', node.width);
};

/**
 * @param {import('./mindmapTypes.js').MindmapDB} db The database
 * @param {object} elem The D3 dom element in which the node is to be added
 * @param {object} node The node to be added
 * @param fullSection
 * @param {object} conf The configuration object
 * @returns {number} The height nodes dom element
 */
export const drawNode = function (db, elem, node, fullSection, conf) {
  const htmlLabels = conf.htmlLabels;
  const section = fullSection % (MAX_SECTIONS - 1);
  const nodeElem = elem.append('g');
  node.section = section;
  let sectionClass = 'section-' + section;
  if (section < 0) {
    sectionClass += ' section-root';
  }
  nodeElem.attr('class', (node.class ? node.class + ' ' : '') + 'mindmap-node ' + sectionClass);
  const bkgElem = nodeElem.append('g');

  // Create the wrapped text element
  const textElem = nodeElem.append('g');
  const description = node.descr.replace(/(<br\/*>)/g, '\n');
  const newEl = createText(textElem, description, {
    useHtmlLabels: htmlLabels,
    width: node.width,
    classes: 'mindmap-node-label',
  });

  if (!htmlLabels) {
    textElem
      .attr('dy', '1em')
      .attr('alignment-baseline', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle');
  }
  // .call(wrap, node.width);
  const bbox = textElem.node().getBBox();
  const fontSize = conf.fontSize.replace ? conf.fontSize.replace('px', '') : conf.fontSize;
  node.height = bbox.height + fontSize * 1.1 * 0.5 + node.padding;
  node.width = bbox.width + 2 * node.padding;
  if (node.icon) {
    if (node.type === db.nodeType.CIRCLE) {
      node.height += 50;
      node.width += 50;
      const icon = nodeElem
        .append('foreignObject')
        .attr('height', '50px')
        .attr('width', node.width)
        .attr('style', 'text-align: center;');
      icon
        .append('div')
        .attr('class', 'icon-container')
        .append('i')
        .attr('class', 'node-icon-' + section + ' ' + node.icon);
      textElem.attr(
        'transform',
        'translate(' + node.width / 2 + ', ' + (node.height / 2 - 1.5 * node.padding) + ')'
      );
    } else {
      node.width += 50;
      const orgHeight = node.height;
      node.height = Math.max(orgHeight, 60);
      const heightDiff = Math.abs(node.height - orgHeight);
      const icon = nodeElem
        .append('foreignObject')
        .attr('width', '60px')
        .attr('height', node.height)
        .attr('style', 'text-align: center;margin-top:' + heightDiff / 2 + 'px;');

      icon
        .append('div')
        .attr('class', 'icon-container')
        .append('i')
        .attr('class', 'node-icon-' + section + ' ' + node.icon);
      textElem.attr(
        'transform',
        'translate(' + (25 + node.width / 2) + ', ' + (heightDiff / 2 + node.padding / 2) + ')'
      );
    }
  } else {
    if (!htmlLabels) {
      const dx = node.width / 2;
      const dy = node.padding / 2;
      textElem.attr('transform', 'translate(' + dx + ', ' + dy + ')');
      // textElem.attr('transform', 'translate(' + node.width / 2 + ', ' + node.padding / 2 + ')');
    } else {
      const dx = (node.width - bbox.width) / 2;
      const dy = (node.height - bbox.height) / 2;
      textElem.attr('transform', 'translate(' + dx + ', ' + dy + ')');
    }
  }

  switch (node.type) {
    case db.nodeType.DEFAULT:
      defaultBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.ROUNDED_RECT:
      roundedRectBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.RECT:
      rectBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.CIRCLE:
      bkgElem.attr('transform', 'translate(' + node.width / 2 + ', ' + +node.height / 2 + ')');
      circleBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.CLOUD:
      cloudBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.BANG:
      bangBkg(db, bkgElem, node, section, conf);
      break;
    case db.nodeType.HEXAGON:
      hexagonBkg(db, bkgElem, node, section, conf);
      break;
  }

  db.setElementForId(node.id, nodeElem);
  return node.height;
};

export const positionNode = function (db, node) {
  const nodeElem = db.getElementById(node.id);

  const x = node.x || 0;
  const y = node.y || 0;
  // Position the node to its coordinate
  nodeElem.attr('transform', 'translate(' + x + ',' + y + ')');
};
