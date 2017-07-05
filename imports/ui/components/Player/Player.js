import React from 'react';
import styled from 'styled-components';
import { createContainer } from 'meteor/react-meteor-data';
import { Player as Players } from '../../../api/collections';

const getSkillColor = skillValue => {
  if (skillValue > 80) return '#239454';
  if (skillValue > 70) return '#8dc153';
  if (skillValue > 60) return '#f6bb43';
  if (skillValue > 50) return '#e77e23';
  if (skillValue > 0) return '#e9573e';
  return '';
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

const Skill = styled.span`
  background-color: ${props => getSkillColor(props.value)};
  color: #ffffff;
  padding: 1px;
  border-radius: 10%;
  &:before {
    content: '${props => props.value}'
  }
`;

const SkillWrapper = styled.p`margin: 0;`;

const SkillTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: gray;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const SkillBox = styled.div`
  padding: 10px;
  border: 1px solid black;
`;

const Player = ({ player }) =>
  player
    ? <Container>
        <h3>
          {player.name}
        </h3>
        <img src={player.headshotImgUrl} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <SkillBox>
            <SkillTitle>Attacking</SkillTitle>
            <SkillWrapper>
              <Skill value={player.crossing} /> Crossing
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.finishing} /> Finishing
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.headingaccuracy} /> Heading Accuracy
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.shortpassing} /> Short Passing
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.volleys} /> Volleys
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Skill</SkillTitle>
            <SkillWrapper>
              <Skill value={player.dribbling} /> Dribbling
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.curve} /> Curve
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.freekickaccuracy} /> Free Kick Accuracy
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.longpassing} /> Long Passing
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.ballcontrol} /> Ball Control
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Movement</SkillTitle>
            <SkillWrapper>
              <Skill value={player.acceleration} /> Acceleration
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.sprintspeed} /> Sprint Speed
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.agility} /> Agility
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.reactions} /> Reactions
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.balance} /> Balance
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Power</SkillTitle>
            <SkillWrapper>
              <Skill value={player.shotpower} /> Shot Power
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.jumping} /> Jumping
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.stamina} /> Stamina
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.strength} /> Strength
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.longshots} /> Long Shots
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Mentality</SkillTitle>
            <SkillWrapper>
              <Skill value={player.aggression} /> Aggression
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.interceptions} /> Interceptions
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.positioning} /> Positioning
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.vision} /> Vision
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.penalties} /> Penalties
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Defending</SkillTitle>
            <SkillWrapper>
              <Skill value={player.marking} /> Marking
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.standingtackle} /> Standing Tackle
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.slidingtackle} /> Sliding Tackle
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle>Goalkeeping</SkillTitle>
            <SkillWrapper>
              <Skill value={player.gkdiving} /> GK Diving
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.gkhandling} /> GK Handling
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.gkhandling} /> GK Kicking
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.gkpositioning} /> GK Positioning
            </SkillWrapper>
            <SkillWrapper>
              <Skill value={player.gkreflexes} /> GK Reflexes
            </SkillWrapper>
          </SkillBox>
          <SkillBox>
            <SkillTitle
              style={{
                marginTop: '10px',
              }}
            >
              Traits
            </SkillTitle>
            {player.traits &&
              player.traits.map(trait =>
                <div key={trait}>
                  <SkillWrapper>
                    {trait}
                  </SkillWrapper>
                </div>
              )}
          </SkillBox>
          <SkillBox>
            <SkillTitle
              style={{
                marginTop: '10px',
              }}
            >
              Specialities
            </SkillTitle>
            {player.specialities &&
              player.specialities.map(speciality =>
                <div key={speciality}>
                  <SkillWrapper>
                    {speciality}
                  </SkillWrapper>
                </div>
              )}
          </SkillBox>
        </div>
      </Container>
    : null;

export default createContainer(
  ({ id }) => ({
    player: Players.findOne(id),
  }),
  Player
);
