import React, { useContext } from 'react';
import { HorizontalSection } from '../../styles/Sections';
import { AttributeLine } from '../Line';
import { maxDot } from '../../helpers/maxLevels';
import AttributesContext from '../../contexts/AttributesContext';
import GenerationContext from '../../contexts/GenerationContext';
import ColumnTitle from '../ColumnTitle';
import { calcPexAttribute } from '../../helpers/pex';
import SectionTitle from '../SectionTitle';
import ModeContext from '../../contexts/ModeContext';
import SectionsContext from '../../contexts/SectionsContext';

const Attributes = () => {
  const {
    strength,
    dexterity,
    stamina,
    charisma,
    manipulation,
    appearance,
    perception,
    intelligence,
    wits,
  } = useContext(AttributesContext);
  const generation = useContext(GenerationContext);
  const { editMode } = useContext(ModeContext);
  const { useGeneration } = useContext(SectionsContext);
  const maxLevel = maxDot(useGeneration ? generation.value : 13);
  return (
    <>
      <SectionTitle
        title="Attributs"
        pexElems={[
          {
            elemArray: [
              strength,
              dexterity,
              stamina,
              charisma,
              manipulation,
              appearance,
              perception,
              intelligence,
              wits,
            ],
            pexCalc: calcPexAttribute(maxLevel),
          },
        ]}
      />
      <HorizontalSection>
        <div>
          <ColumnTitle
            elemArray={[strength, dexterity, stamina]}
            pexCalc={calcPexAttribute(maxLevel)}
            title="Physique"
          />
          <AttributeLine
            title="Force"
            elem={strength}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Dextrérité"
            elem={dexterity}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Vigueur"
            elem={stamina}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
        </div>
        <div>
          <ColumnTitle
            elemArray={[charisma, manipulation, appearance]}
            pexCalc={calcPexAttribute(maxLevel)}
            title="Social"
          />
          <AttributeLine
            title="Charisme"
            elem={charisma}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Manipulation"
            elem={manipulation}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Apparence"
            elem={appearance}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
        </div>
        <div>
          <ColumnTitle
            elemArray={[perception, intelligence, wits]}
            pexCalc={calcPexAttribute(maxLevel)}
            title="Mental"
          />
          <AttributeLine
            title="Perception"
            elem={perception}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Intelligence"
            elem={intelligence}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
          <AttributeLine
            title="Astuce"
            elem={wits}
            maxLevel={maxLevel}
            inactive={!editMode}
          />
        </div>
      </HorizontalSection>
    </>
  );
};

export default Attributes;
