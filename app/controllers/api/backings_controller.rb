class Api::BackingsController < ApplicationController
  def create
    @backing = Backing.new(backings_params)
    @backing.user_id = current_user.id

    if @backing.save
      @project = Project.includes(:user).find(@backing.project_id)
      @backed = [];
      if current_user
        @backed = Backing.find_by(project_id: @project.id, user_id: current_user.id)
        if @backed == nil
          @backed = []
        else
          @backed = [@backed.id, Reward.find_by(id: @backed.rewards).title, Reward.find_by(id: @backed.rewards).description]
        end
      end
      @backed
      @num_backers = @project.backings.count + 23
      @current_user = current_user
      @total_pledged = @project.total_pledged
      render "api/backing/show"
    else
      render json: @backing.errors.full_messages, status: 422
    end
  end

  def destroy
    @backing = Backing.find(params[:id])
    @project = Project.includes(:user).find(@backing.project_id)
    @backed = [];
    @backing.destroy
    @total_pledged = @project.total_pledged
    @num_backers = @project.backings.count + 23
    @current_user = current_user
    render "api/backing/show"
  end

  private

  def backings_params
    params.require(:backing).permit(:reward_id, :project_id)
  end
end
