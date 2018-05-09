import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import PLAYER_QUERY from '../graphql/PlayerQuery.graphql';

const getSkillColor = (skillValue, themeColor) => {
  if (skillValue > 80) return themeColor.fifaDarkGreen;
  if (skillValue > 70) return themeColor.fifaLightGreen;
  if (skillValue > 60) return themeColor.fifaYellow;
  if (skillValue > 50) return themeColor.fifaOrange;
  if (skillValue > 0) return themeColor.fifaRed;
  return '';
};

const getAttributeValue = (attributes, name) =>
  attributes.find(attr => attr.name === name).value;

const Skill = styled.span`
  color: ${props => getSkillColor(props.value, props.theme.color)};
  &:before {
    content: '${props => props.value}'
  }
`;

const AttributeTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 4px;
  padding: 1px;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const Player = ({ id }) =>
  id ? (
    <Query query={PLAYER_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if ((loading && !data.player) || error) {
          return null;
        }
        const { player } = data;
        return (
          <Row>
            <Column>
              <div>
                {player.firstName} {player.lastName}
              </div>
              <Row>
                <img
                  src={player.headshotImgUrl}
                  alt="Player headshot"
                  width="120"
                  height="120"
                />
                <Column>
                  <SpaceBetween>
                    <div>Overall</div>
                    <Skill value={player.rating} />
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>Position</div>
                    <div>{player.position}</div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>Age</div>
                    <div>{player.age}</div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>Height</div>
                    <div>{player.height}</div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>Weight</div>
                    <div>{player.weight}</div>
                  </SpaceBetween>
                </Column>
              </Row>
              <Column>
                <div>CHARACTERISTICS</div>
                <SpaceBetween>
                  <div>FOOT</div>
                  <div>{player.foot}</div>
                </SpaceBetween>
                <SpaceBetween>
                  <div>ATTACK WORKRATE</div>
                  <div>{player.atkWorkRate}</div>
                </SpaceBetween>
                <SpaceBetween>
                  <div>DEFENSIVE WORKRATE</div>
                  <div>{player.defWorkRate}</div>
                </SpaceBetween>
                <SpaceBetween>
                  <div>WEAK FOOT</div>
                  <div>{player.weakFoot}</div>
                </SpaceBetween>
                <SpaceBetween>
                  <div>SKILL MOVES</div>
                  <div>{player.skillMoves}</div>
                </SpaceBetween>
              </Column>
            </Column>
            <Column>
              <Column>
                <div>TRAITS</div>
                {player.traits.map(trait => <div key={trait}>{trait}</div>)}
              </Column>
              <Column>
                <div>SPECIALTIES</div>
                {player.specialities.map(specialty => (
                  <div key={specialty}>{specialty}</div>
                ))}
              </Column>
            </Column>
            <Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>SHOOTING</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'SHO')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>POSITIONING</div>
                  <Skill value={player.positioning} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>FINISHING</div>
                  <Skill value={player.finishing} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>SHOT POWER</div>
                  <Skill value={player.shotpower} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>LONG SHOTS</div>
                  <Skill value={player.longshots} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>VOLLEYS</div>
                  <Skill value={player.volleys} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>PENALTIES</div>
                  <Skill value={player.penalties} />
                </SpaceBetween>
              </Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>PACE</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'PAC')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>ACCELERATION</div>
                  <Skill value={player.acceleration} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>SPRINT SPEED</div>
                  <Skill value={player.sprintspeed} />
                </SpaceBetween>
              </Column>
            </Column>
            <Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>PASSING</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'PAS')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>VISION</div>
                  <Skill value={player.vision} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>CROSSING</div>
                  <Skill value={player.crossing} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>FREE KICK ACCURACY</div>
                  <Skill value={player.freekickaccuracy} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>SHORT PASSING</div>
                  <Skill value={player.shortpassing} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>LONG PASSING</div>
                  <Skill value={player.longpassing} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>CURVE</div>
                  <Skill value={player.curve} />
                </SpaceBetween>
              </Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>PHYSICALITY</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'PHY')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>JUMPING</div>
                  <Skill value={player.jumping} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>STAMINA</div>
                  <Skill value={player.stamina} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>STRENGTH</div>
                  <Skill value={player.strength} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>AGGRESSION</div>
                  <Skill value={player.aggression} />
                </SpaceBetween>
              </Column>
            </Column>
            <Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>DRIBBLING</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'DRI')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>AGILITY</div>
                  <Skill value={player.agility} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>BALANCE</div>
                  <Skill value={player.balance} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>REACTIONS</div>
                  <Skill value={player.reactions} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>BALL CONTROL</div>
                  <Skill value={player.ballcontrol} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>DRIBBLING</div>
                  <Skill value={player.dribbling} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>COMPOSURE</div>
                  <Skill value={player.composure} />
                </SpaceBetween>
              </Column>
              <Column>
                <SpaceBetween>
                  <AttributeTitle>DEFENDING</AttributeTitle>
                  <Skill value={getAttributeValue(player.attributes, 'DEF')} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>INTERCEPTIONS</div>
                  <Skill value={player.interceptions} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>HEADING ACCURACY</div>
                  <Skill value={player.headingaccuracy} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>MARKING</div>
                  <Skill value={player.marking} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>STANDING TACKLE</div>
                  <Skill value={player.standingtackle} />
                </SpaceBetween>
                <SpaceBetween>
                  <div>SLIDING TACKLE</div>
                  <Skill value={player.slidingtackle} />
                </SpaceBetween>
              </Column>
            </Column>
          </Row>
        );
      }}
    </Query>
  ) : null;

export default Player;
