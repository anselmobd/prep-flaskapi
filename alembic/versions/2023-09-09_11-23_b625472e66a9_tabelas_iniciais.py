"""Tabelas iniciais

Revision ID: b625472e66a9
Revises: 
Create Date: 2023-09-09 11:23:21.074175

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

import imp
import os
alembic_helpers = imp.load_source('alembic_helpers', (
    os.getcwd() + '/' + op.get_context().script.dir + '/alembic_helpers.py'))


# revision identifiers, used by Alembic.
revision: str = 'b625472e66a9'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    if not alembic_helpers.table_exist('note'):
        op.create_table(
            'note',
            sa.Column('id', sa.INTEGER(), nullable=False),
            sa.Column('person_id', sa.INTEGER(), nullable=True),
            sa.Column('content', sa.VARCHAR(), nullable=False),
            sa.Column('timestamp', sa.DATETIME(), nullable=True),
            sa.ForeignKeyConstraint(['person_id'], ['person.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
    if not alembic_helpers.table_exist('person'):
        op.create_table(
            'person',
            sa.Column('id', sa.INTEGER(), nullable=False),
            sa.Column('lname', sa.VARCHAR(length=32), nullable=False),
            sa.Column('fname', sa.VARCHAR(length=32), nullable=True),
            sa.Column('timestamp', sa.DATETIME(), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )


def downgrade() -> None:
    # comentei para evitar problemas
    # op.drop_table('person')
    # op.drop_table('note')
    pass